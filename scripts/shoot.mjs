/**
 * Full-page screenshots at given viewport widths, driven over CDP so the
 * emulated viewport is accurate (unlike chrome --window-size).
 *
 * Usage: node scripts/shoot.mjs <width> <path> <outfile> [maxHeight]
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const [, , widthArg, path, outFile, maxHArg, anchorArg] = process.argv;
const width = Number(widthArg);
const maxHeight = Number(maxHArg || 6000);
/** Optional CSS selector — capture starts at this element's top. */
const anchor = anchorArg || null;
const BASE = "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=" + process.cwd() + "\\.chrome-shot",
    "about:blank",
  ],
  { stdio: "ignore" }
);

async function wsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const j = await r.json();
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
    } catch {
      /* not ready */
    }
    await sleep(250);
  }
  throw new Error("no chrome");
}

const ws = new WebSocket(await wsUrl());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
let sessionId = null;
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
});
const send = (method, params = {}, useSession = true) => {
  const mid = ++id;
  const p = { id: mid, method, params };
  if (useSession && sessionId) p.sessionId = sessionId;
  ws.send(JSON.stringify(p));
  return new Promise((res, rej) => pending.set(mid, { resolve: res, reject: rej }));
};

const { targetId } = await send("Target.createTarget", { url: "about:blank" }, false);
({ sessionId } = await send("Target.attachToTarget", { targetId, flatten: true }, false));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: 900,
  deviceScaleFactor: 1,
  mobile: width < 768,
});

await send("Page.navigate", { url: BASE + path });
await sleep(2500);

// Reveal-on-scroll content needs a pass down the page before capture.
await send("Runtime.evaluate", {
  expression: `(async () => {
    const step = window.innerHeight;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  })()`,
  awaitPromise: true,
});

const { result } = await send("Runtime.evaluate", {
  expression: "Math.min(document.body.scrollHeight, " + maxHeight + ")",
  returnByValue: true,
});
const height = Math.ceil(result.value);

await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 768,
});
await sleep(700);

let y = 0;
if (anchor) {
  const { result: pos } = await send("Runtime.evaluate", {
    expression: `(() => { const el = document.querySelector(${JSON.stringify(
      anchor
    )}); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0; })()`,
    returnByValue: true,
  });
  y = pos.value;
}

const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  clip: { x: 0, y, width, height, scale: 1 },
});
writeFileSync(outFile, Buffer.from(shot.data, "base64"));
console.log(`${outFile}  ${width}x${height}`);

ws.close();
chrome.kill();
process.exit(0);
