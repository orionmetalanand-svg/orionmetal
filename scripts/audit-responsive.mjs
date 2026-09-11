/**
 * Responsive audit: drives headless Chrome over CDP, loads each page at a set of
 * viewport widths, and reports horizontal overflow plus the elements causing it.
 *
 * Usage: node scripts/audit-responsive.mjs [baseUrl]
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.argv[2] || "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

const PAGES = [
  "/",
  "/about",
  "/services",
  "/products",
  "/projects",
  "/industries",
  "/contact",
  "/blog",
];

const WIDTHS = [320, 360, 390, 414, 768, 1024, 1440];

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=" + process.cwd() + "\\.chrome-audit",
    "about:blank",
  ],
  { stdio: "ignore" }
);

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const json = await res.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch {
      // Chrome not up yet.
    }
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging endpoint");
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.sessionId = null;
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
    });
  }

  send(method, params = {}, useSession = true) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (useSession && this.sessionId) payload.sessionId = this.sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
}

// Runs in the page: find elements wider than the viewport.
const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const docW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const offenders = [];
  if (docW > vw + 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.position === 'fixed') continue;
      if (r.right > vw + 1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute('class') || '').slice(0, 110),
          text: (el.textContent || '').trim().slice(0, 45),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
  }
  offenders.sort((a, b) => b.right - a.right);
  const seen = new Set();
  const top = offenders.filter(o => {
    const k = o.tag + o.cls;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 6);
  return JSON.stringify({ vw, docW, overflow: docW - vw, offenders: top });
})()`;

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
const cdp = new Cdp(ws);

const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" }, false);
const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true }, false);
cdp.sessionId = sessionId;
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");

let problems = 0;
const rows = [];

for (const path of PAGES) {
  for (const width of WIDTHS) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    await cdp.send("Page.navigate", { url: BASE + path });
    // Wait for network/render to settle.
    await sleep(1400);

    const { result } = await cdp.send("Runtime.evaluate", {
      expression: PROBE,
      returnByValue: true,
      awaitPromise: false,
    });

    const data = JSON.parse(result.value);
    if (data.overflow > 1) {
      problems++;
      rows.push({ path, width, ...data });
    }
  }
  process.stdout.write(`checked ${path}\n`);
}

console.log("\n=========== HORIZONTAL OVERFLOW REPORT ===========");
if (!rows.length) {
  console.log("No horizontal overflow at any tested width.");
} else {
  for (const r of rows) {
    console.log(`\n${r.path}  @${r.width}px  -> doc ${r.docW}px (overflow +${r.overflow}px)`);
    for (const o of r.offenders) {
      console.log(`    <${o.tag}> right=${o.right} w=${o.width}`);
      console.log(`      class: ${o.cls}`);
      if (o.text) console.log(`      text : ${o.text}`);
    }
  }
}
console.log(`\nTotal failing combinations: ${problems}`);

ws.close();
chrome.kill();
process.exit(0);
