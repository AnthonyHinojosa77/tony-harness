// Usage: node e2e/screenshot.mjs <url> <out.png> [width] [height]
import { chromium } from "playwright";
const [url, out, w = "390", h = "844"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: Number(w), height: Number(h) }, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: "networkidle" });
await p.screenshot({ path: out, fullPage: true });
await b.close();
