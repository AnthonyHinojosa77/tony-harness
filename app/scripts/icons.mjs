// Renders the app icon SVG into the PNG sizes phones need. Run: node scripts/icons.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";

const svg = readFileSync("src/app/icon.svg");
mkdirSync("public/icons", { recursive: true });
const jobs = [
  ["src/app/apple-icon.png", 180, "#f6f1e6"],
  ["public/icons/icon-192.png", 192, "#f6f1e6"],
  ["public/icons/icon-512.png", 512, "#f6f1e6"],
  ["public/icons/maskable-512.png", 512, "#58c26a", true],
];
for (const [out, size, bg, maskable] of jobs) {
  // Maskable icons need the artwork inside the safe zone (center 80%).
  const inner = maskable ? Math.round(size * 0.7) : Math.round(size * 0.86);
  const art = await sharp(svg).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: art, gravity: "centre" }])
    .png()
    .toFile(out);
  console.log("wrote", out);
}
