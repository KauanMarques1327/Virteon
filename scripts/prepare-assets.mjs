// Extract only photographic areas; source mockups remain unchanged.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/assets", { recursive: true });
const assets = [
  ["industry-person", "tela-inicial", "21.18.21", 458, 104, 210, 251],
  ["school-small", "tela-inicial", "21.18.21", 1089, 104, 211, 251],
  ["aciaria", "tela-inicial", "21.19.15", 39, 174, 393, 205],
  ["alto-forno", "tela-inicial", "21.19.15", 459, 174, 391, 205],
  ["laminacao", "tela-inicial", "21.19.15", 879, 174, 391, 205],
  ["vr-journey", "tela-inicial", "21.20.06", 43, 0, 564, 350],
  ["school", "tela-inicial", "21.21.05", 46, 28, 564, 325],
  ["training-hero", "virteon-industry", "23.02.41", 555, 142, 320, 125],
  ["energy", "virteon-industry", "23.02.41", 418, 508, 220, 64],
  ["epis", "virteon-industry", "23.02.41", 729, 487, 146, 85],
  ["edu-hero", "virteon-edu", "23.11.56", 579, 151, 294, 161],
  ["edu-steel", "virteon-edu", "23.11.56", 176, 497, 220, 64],
  ["edu-recycle", "virteon-edu", "23.11.56", 414, 498, 219, 62],
  ["edu-career", "virteon-edu", "23.11.56", 652, 498, 221, 63],
];
for (const [name, folder, time, left, top, width, height] of assets) {
  const file = `public/${folder}/WhatsApp Image 2026-10-28 at ${time}.jpeg`;
  await sharp(file)
    .extract({ left, top, width, height })
    .webp({ quality: 95 })
    .toFile(`public/assets/${name}.webp`);
}
console.log(`${assets.length} photographic assets prepared without upscaling.`);
