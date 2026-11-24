// The portrait in the same flow style as the covers: a small greyscale field
// taken from the photo (public/img/portrait-field.bin, made by `npm run portrait`)
// steers the streamlines, and they pack tighter where the photo is darker.
// Pure and seeded, so it runs at build time for the fallback SVG and in the
// browser for a fresh drawing on every visit.
import { palette, mulberry32, makeNoise } from './cover.js';

export const FW = 160; // field resolution
export const FH = 200;
const W = 800;
const H = 1000;

export const portraitDefaults = {
  seed: 20261116,
  stroke: 1.3, // line weight; heavier for the small version
  dmin: 4, // line spacing in the darkest areas
  dmax: 30, // line spacing in the lightest areas
  contour: 0.9, // how strongly lines follow the face; 0 = pure currents
};

export function renderPortrait(field, options) {
  const p = Object.assign({}, portraitDefaults, options);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const px = (i, j) => field[clamp(j, 0, FH - 1) * FW + clamp(i, 0, FW - 1)] / 255;
  const bright = (x, y) => {
    const fx = (x / W) * (FW - 1);
    const fy = (y / H) * (FH - 1);
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const u = fx - i;
    const v = fy - j;
    const a = px(i, j) + (px(i + 1, j) - px(i, j)) * u;
    const b = px(i, j + 1) + (px(i + 1, j + 1) - px(i, j + 1)) * u;
    return a + (b - a) * v;
  };

  const rand = mulberry32(p.seed >>> 0);
  const noise = makeNoise(rand);
  const R = (a, b) => a + (b - a) * rand();
  const freq = R(0.0025, 0.0045);
  // Lines follow the photo's contours, bent by slow noise currents that change with the seed.
  const angle = (x, y) => {
    const e = 4;
    const gx = (bright(x + e, y) - bright(x - e, y)) * 60;
    const gy = (bright(x, y + e) - bright(x, y - e)) * 60;
    const t = noise(x * freq, y * freq) * Math.PI * 3;
    return Math.atan2(p.contour * gx + Math.sin(t), -p.contour * gy + Math.cos(t));
  };
  const spacing = (x, y) => p.dmin + (p.dmax - p.dmin) * Math.pow(bright(x, y), 1.4);

  // Variable-density evenly spaced streamlines (Jobard and Lefer).
  const cell = p.dmin;
  const gw = Math.ceil(W / cell) + 3;
  const grid = new Map();
  const near = (x, y, d, id) => {
    const r = Math.ceil(d / cell);
    const cx = Math.floor(x / cell) + 1;
    const cy = Math.floor(y / cell) + 1;
    for (let j = cy - r; j <= cy + r; j++) {
      for (let i = cx - r; i <= cx + r; i++) {
        for (const pt of grid.get(j * gw + i) ?? []) if (pt[2] !== id && (pt[0] - x) ** 2 + (pt[1] - y) ** 2 < d * d) return true;
      }
    }
    return false;
  };
  const inside = (x, y) => x > -10 && x < W + 10 && y > -10 && y < H + 10;
  const half = (x, y, sign, id) => {
    const pts = [];
    for (let i = 0; i < 600; i++) {
      const th = angle(x, y);
      x += sign * 2.5 * Math.cos(th);
      y += sign * 2.5 * Math.sin(th);
      if (!inside(x, y) || near(x, y, spacing(x, y) * 0.5, id)) break;
      pts.push([x, y]);
    }
    return pts;
  };
  const lines = [];
  const add = (x, y, accent) => {
    if (near(x, y, spacing(x, y), -1)) return;
    const id = lines.length;
    const pts = [...half(x, y, -1, id).reverse(), [x, y], ...half(x, y, 1, id)];
    if (pts.length < 30) return; // drop the tiny loops that form around specks in the photo
    for (const pt of pts) {
      const k = (Math.floor(pt[1] / cell) + 1) * gw + Math.floor(pt[0] / cell) + 1;
      if (!grid.has(k)) grid.set(k, []);
      grid.get(k).push([pt[0], pt[1], id]);
    }
    lines.push({ pts, accent });
  };

  add(W * R(0.38, 0.62), H * R(0.28, 0.46), true); // one accent line across the face
  const seeds = [];
  for (let y = p.dmin / 2; y < H; y += p.dmin) for (let x = p.dmin / 2; x < W; x += p.dmin) seeds.push([x, y]);
  for (let i = seeds.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [seeds[i], seeds[j]] = [seeds[j], seeds[i]];
  }
  for (const [x, y] of seeds) add(x, y, false);

  const n = (v) => Math.round(v);
  const { light, dark } = palette;
  let svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<style>.b{fill:${light.bg}}.l{fill:none;stroke:${light.ink};stroke-width:${p.stroke};stroke-linecap:round;stroke-linejoin:round}` +
    `.a{stroke:${light.accent};stroke-width:${p.stroke * 2.2}}@media(prefers-color-scheme:dark){.b{fill:${dark.bg}}` +
    `.l{stroke:${dark.ink}}.a{stroke:${dark.accent}}}</style><rect class="b" width="${W}" height="${H}"/>`;
  for (const l of [...lines.filter((l) => !l.accent), ...lines.filter((l) => l.accent)]) {
    const pts = l.pts.filter((_, i) => i % 3 === 0 || i === l.pts.length - 1);
    svg += `<path class="l${l.accent ? ' a' : ''}" d="M${pts.map((q) => `${n(q[0])} ${n(q[1])}`).join('L')}"/>`;
  }
  return svg + '</svg>';
}

/** Settings for the small version (home page, article byline): fewer lines, drawn heavier. */
export const portraitThumb = { dmin: 11, dmax: 60, stroke: 4.5 };
