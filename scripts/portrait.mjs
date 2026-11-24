// Turns design/portrait/source.webp into the small greyscale field the portrait
// is drawn from, and writes fallback SVGs for visitors without JavaScript.
// The browser redraws the portrait from the field on every visit.
// Run with `npm run portrait` after changing the source photo.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { renderPortrait, portraitThumb, FW, FH } from '../src/lib/portrait.js';

const SRC = 'design/portrait/source.webp';

// 4:5 crop from the middle of the photo, as a small, blurred greyscale field
const meta = await sharp(SRC).metadata();
const cropW = Math.min(meta.width, Math.round(meta.height * 0.8));
const cropH = Math.min(meta.height, Math.round(cropW / 0.8));
const { data } = await sharp(SRC)
  .extract({ left: Math.round((meta.width - cropW) / 2), top: 0, width: cropW, height: cropH })
  .resize(FW, FH, { fit: 'fill' })
  .greyscale()
  .blur(3)
  .normalise()
  .raw()
  .toBuffer({ resolveWithObject: true });

writeFileSync('public/img/portrait-field.bin', data);
for (const [out, options] of [['public/img/portrait.svg', {}], ['public/img/portrait-thumb.svg', portraitThumb]]) {
  const t = Date.now();
  const svg = renderPortrait(data, options);
  writeFileSync(out, svg);
  console.log(`${out}: ${(svg.length / 1024).toFixed(1)} KB in ${Date.now() - t} ms`);
}
