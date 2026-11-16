// Redraws design/portrait/source.webp as "Latent Traces": the photo becomes the
// hidden field, and a stack of channels each records how dark it is along one
// row. Run with `npm run portrait` after changing the source photo or settings.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { palette } from '../src/lib/cover.js';

const SRC = 'design/portrait/source.webp';
const OUT = process.env.OUT ?? 'public/img/portrait.svg';
const STROKE = Number(process.env.STROKE ?? 1.6); // line weight; heavier for the small version

const W = 800;
const H = 1000;
const ROWS = Number(process.env.ROWS ?? 58); // channels
const COLS = Number(process.env.COLS ?? 150); // samples per channel
const AMP = Number(process.env.AMP ?? 3.4); // peak height, in row spacings
const GAMMA = Number(process.env.GAMMA ?? 1.25); // >1 keeps light areas calm
const ACCENT_ROW = Math.round(ROWS * Number(process.env.ACCENT ?? 0.36));

// 4:5 crop from the middle of the photo, as a small greyscale field
const meta = await sharp(SRC).metadata();
const cropW = Math.min(meta.width, Math.round(meta.height * 0.8));
const cropH = Math.min(meta.height, Math.round(cropW / 0.8));
const { data } = await sharp(SRC)
  .extract({ left: Math.round((meta.width - cropW) / 2), top: 0, width: cropW, height: cropH })
  .resize(COLS, ROWS, { fit: 'fill' })
  .greyscale()
  .blur(0.8)
  .normalise()
  .raw()
  .toBuffer({ resolveWithObject: true });

let seed = 20261116;
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const top = H * 0.07;
const sp = (H * 0.985 - top) / (ROWS - 1);
const n = (v) => Math.round(v);
const { light, dark } = palette;

let svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
  `<style>.b,.l{fill:${light.bg}}.l{stroke:${light.ink};stroke-width:${STROKE};stroke-linejoin:round}` +
  `.a{stroke:${light.accent};stroke-width:${STROKE * 1.9}}@media(prefers-color-scheme:dark){.b,.l{fill:${dark.bg}}` +
  `.l{stroke:${dark.ink}}.a{stroke:${dark.accent}}}</style><rect class="b" width="${W}" height="${H}"/>`;

for (let r = 0; r < ROWS; r++) {
  const base = top + r * sp;
  let drift = 0;
  const pts = [];
  for (let c = 0; c < COLS; c++) {
    const darkness = 1 - data[r * COLS + c] / 255;
    drift = drift * 0.7 + (rand() - 0.5) * 0.3; // a little instrument noise
    const y = base - (Math.pow(darkness, GAMMA) * AMP + drift * 0.35) * sp;
    pts.push(`${n(-10 + (c / (COLS - 1)) * (W + 20))} ${n(y)}`);
  }
  svg += `<path class="l${r === ACCENT_ROW ? ' a' : ''}" d="M${pts.join('L')}V${H + 20}H-10Z"/>`;
}
svg += '</svg>';

writeFileSync(OUT, svg);
console.log(`${OUT}: ${ROWS} channels, ${(svg.length / 1024).toFixed(1)} KB`);
