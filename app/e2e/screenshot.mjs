import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await p.screenshot({ path: process.argv[2] });
await b.close();
