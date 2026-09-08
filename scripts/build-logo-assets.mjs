/**
 * Builds web-ready logo assets from the source PNG:
 *   orion-logo.png       — trimmed, original colours (for light backgrounds)
 *   orion-logo-light.png — trimmed, black recoloured to white (for dark backgrounds)
 *
 * Usage: node scripts/build-logo-assets.mjs "<source.png>"
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import zlib from "zlib";

/* ── PNG decode (8-bit RGBA only) ─────────────────────── */
function decodePng(buf) {
  let pos = 8;
  const idat = [];
  let width = 0;
  let height = 0;

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || data[9] !== 6) {
        throw new Error("Expected 8-bit RGBA PNG");
      }
    }
    if (type === "IDAT") idat.push(data);
    if (type === "IEND") break;
    pos += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);

  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  };

  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[rp++];
      const left = x >= bpp ? out[y * stride + x - bpp] : 0;
      const up = y > 0 ? out[(y - 1) * stride + x] : 0;
      const upLeft = x >= bpp && y > 0 ? out[(y - 1) * stride + x - bpp] : 0;
      let value;
      if (filter === 0) value = rawByte;
      else if (filter === 1) value = rawByte + left;
      else if (filter === 2) value = rawByte + up;
      else if (filter === 3) value = rawByte + ((left + up) >> 1);
      else value = rawByte + paeth(left, up, upLeft);
      out[y * stride + x] = value & 0xff;
    }
  }

  return { width, height, data: out };
}

/* ── PNG encode ───────────────────────────────────────── */
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const paethPredictor = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
};

/** Per-scanline adaptive filtering — cuts file size dramatically on flat artwork. */
function filterScanlines({ width, height, data }) {
  const bpp = 4;
  const stride = width * bpp;
  const out = Buffer.alloc(height * (stride + 1));
  const candidate = Buffer.alloc(stride);
  const best = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    let bestType = 0;
    let bestScore = Infinity;

    for (let type = 0; type <= 4; type++) {
      let score = 0;
      for (let x = 0; x < stride; x++) {
        const raw = data[y * stride + x];
        const left = x >= bpp ? data[y * stride + x - bpp] : 0;
        const up = y > 0 ? data[(y - 1) * stride + x] : 0;
        const upLeft = x >= bpp && y > 0 ? data[(y - 1) * stride + x - bpp] : 0;

        let value;
        if (type === 0) value = raw;
        else if (type === 1) value = raw - left;
        else if (type === 2) value = raw - up;
        else if (type === 3) value = raw - ((left + up) >> 1);
        else value = raw - paethPredictor(left, up, upLeft);

        value &= 0xff;
        candidate[x] = value;
        score += value < 128 ? value : 256 - value;
      }

      if (score < bestScore) {
        bestScore = score;
        bestType = type;
        candidate.copy(best);
      }
    }

    out[y * (stride + 1)] = bestType;
    best.copy(out, y * (stride + 1) + 1);
  }

  return out;
}

/** Area-average downscale, premultiplied so transparent edges stay clean. */
function resize(image, targetWidth) {
  const { width, height, data } = image;
  if (targetWidth >= width) return image;

  const scale = width / targetWidth;
  const newW = targetWidth;
  const newH = Math.max(1, Math.round(height / scale));
  const out = Buffer.alloc(newW * newH * 4);

  for (let y = 0; y < newH; y++) {
    const y0 = Math.floor(y * scale);
    const y1 = Math.min(height, Math.ceil((y + 1) * scale));
    for (let x = 0; x < newW; x++) {
      const x0 = Math.floor(x * scale);
      const x1 = Math.min(width, Math.ceil((x + 1) * scale));

      let rSum = 0;
      let gSum = 0;
      let bSum = 0;
      let aSum = 0;
      let count = 0;

      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * width + sx) * 4;
          const a = data[i + 3];
          rSum += data[i] * a;
          gSum += data[i + 1] * a;
          bSum += data[i + 2] * a;
          aSum += a;
          count++;
        }
      }

      const o = (y * newW + x) * 4;
      if (aSum === 0) continue;
      out[o] = Math.round(rSum / aSum);
      out[o + 1] = Math.round(gSum / aSum);
      out[o + 2] = Math.round(bSum / aSum);
      out[o + 3] = Math.round(aSum / count);
    }
  }

  return { width: newW, height: newH, data: out };
}

function encodePng({ width, height, data }) {
  const rawWithFilters = filterScanlines({ width, height, data });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(rawWithFilters, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ── Processing ───────────────────────────────────────── */
function trim(image, padRatio = 0.02) {
  const { width, height, data } = image;
  const stride = width * 4;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y * stride + x * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const padX = Math.round(contentW * padRatio);
  const padY = Math.round(contentH * padRatio);

  const newW = contentW + padX * 2;
  const newH = contentH + padY * 2;
  const outData = Buffer.alloc(newW * newH * 4); // transparent

  for (let y = 0; y < contentH; y++) {
    const srcStart = (minY + y) * stride + minX * 4;
    const dstStart = (y + padY) * newW * 4 + padX * 4;
    data.copy(outData, dstStart, srcStart, srcStart + contentW * 4);
  }

  return { width: newW, height: newH, data: outData };
}

/** Recolour dark/neutral pixels to white; keep red brand pixels. */
function toLightVariant(image) {
  const { width, height, data } = image;
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = out[i + 3];
    if (a === 0) continue;

    const isRed = r > 70 && r > g * 1.55 && r > b * 1.55;
    if (isRed) {
      // Normalise to brand red for a crisp, consistent mark
      out[i] = 225;
      out[i + 1] = 29;
      out[i + 2] = 46;
    } else {
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
    }
  }

  return { width, height, data: out };
}

const source = process.argv[2];
if (!source) {
  console.error('Usage: node scripts/build-logo-assets.mjs "<source.png>"');
  process.exit(1);
}

const decoded = decodePng(readFileSync(source));
// 1200px is well beyond any on-page render size (largest is ~320px @2x).
const trimmed = resize(trim(decoded), 1200);
const light = toLightVariant(trimmed);

const targets = [
  ["public/images/company/orion-logo.png", trimmed],
  ["public/images/company/orion-logo-light.png", light],
];

for (const [path, image] of targets) {
  const full = resolve(process.cwd(), path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, encodePng(image));
  console.log(`${path} → ${image.width}x${image.height}`);
}
