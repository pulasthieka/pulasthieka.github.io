// Latent Traces — the generative system behind the blog cover images.
// Pure, dependency-free and seeded: the same options always give the same
// drawing. Used at build time (src/pages/covers/[slug].svg.js) and inlined
// into the interactive viewer (design/cover-art/viewer.html).
// See design/cover-art/philosophy.md.

export const W = 1600;
export const H = 900;

export const defaults = {
  seed: 1,
  mode: 'linear', // 'linear' = one current across the page, 'radial' = 1-3 whirls
  channels: 22, // line density
  events: 2, // vortices that disturb the field
  coupling: 0.5, // 0 = turbulent, 1 = long calm currents
  quantize: 0, // 0 = smooth; 3..8 = lines snap to a few headings
  cells: 1, // radial only: number of whirls
  accents: 1, // lines drawn in the accent colour
};

export function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 999983 + 1;
}

export function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded 2D value noise in [0, 1], smooth-stepped.
export function makeNoise(rand) {
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    vals[i] = rand();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  const at = (x, y) => vals[perm[(perm[x & 255] + y) & 255]];
  const fade = (t) => t * t * (3 - 2 * t);
  return function (x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = fade(x - xi);
    const v = fade(y - yi);
    const a = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * u;
    const b = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * u;
    return a + (b - a) * v;
  };
}

// A stimulus: sharp onset, slow recovery with a damped ripple.
function response(d, onset, tau) {
  if (d < 0) return Math.exp(-(d * d) / (2 * onset * onset));
  return Math.exp(-d / tau) * (0.82 + 0.18 * Math.cos(d / (tau * 0.16)));
}

export function generate(options) {
  const p = Object.assign({}, defaults, options);
  const rand = mulberry32(p.seed >>> 0);
  const noise = makeNoise(rand);
  const R = (a, b) => a + (b - a) * rand();
  const C = Math.max(3, Math.round(p.channels));
  const E = Math.max(1, Math.round(p.events));
  const q = Math.round(p.quantize);
  const coupling = Math.min(1, Math.max(0, p.coupling));
  const nAcc = Math.max(0, Math.round(p.accents));
  const radial = p.mode === 'radial';

  // The hidden field: domain-warped noise. Coupling smooths it out.
  const f = 0.0042 + (0.0016 - 0.0042) * coupling;
  const warp = 260 * (1 - 0.5 * coupling);
  const base = (x, y) => {
    const wx = x + warp * (noise(x * f * 0.7 + 11, y * f * 0.7) - 0.5);
    const wy = y + warp * (noise(x * f * 0.7, y * f * 0.7 + 23) - 0.5);
    return (noise(wx * f, wy * f) - 0.5) * Math.PI * (radial ? 2.4 : 1.9) + (noise(wx * f * 3, wy * f * 3 + 7) - 0.5) * 0.9;
  };

  // Linear: one current running across the page. Radial: 1-3 slow whirls.
  const ncells = radial ? Math.min(3, Math.max(1, Math.round(p.cells))) : 0;
  const cells = [];
  for (let i = 0; i < ncells; i++) {
    cells.push({ x: W * ((i + 0.5) / ncells + R(-0.06, 0.06)), y: H * R(0.38, 0.62), s: R(0.8, 1.2) * H * 0.42, dir: rand() < 0.5 ? -1 : 1 });
  }

  // Stimuli are vortices: a sharp rise near the core, then a long, rippling recovery outward.
  const events = [];
  for (let e = 0; e < E; e++) {
    events.push({
      x: W * (0.12 + ((e + R(0.2, 0.8)) / E) * 0.76),
      y: H * R(0.22, 0.78),
      s: R(110, 230),
      amp: R(2.2, 3.6),
      dir: rand() < 0.5 ? -1 : 1,
    });
  }

  const angle = (x, y) => {
    const a = base(x, y);
    let vx = Math.cos(a);
    let vy = Math.sin(a);
    for (const c of cells) {
      const dx = x - c.x;
      const dy = y - c.y;
      const w = 1.6 * Math.exp(-(dx * dx + dy * dy) / (2 * c.s * c.s));
      const r = Math.hypot(dx, dy) || 1;
      vx += (-dy / r) * c.dir * w;
      vy += (dx / r) * c.dir * w;
    }
    for (const ev of events) {
      const dx = x - ev.x;
      const dy = y - ev.y;
      const r = Math.hypot(dx, dy) || 1;
      const g = ev.amp * response((r - ev.s * 0.3) / ev.s, 0.12, 0.7);
      vx += (-dy / r) * ev.dir * g;
      vy += (dx / r) * ev.dir * g;
    }
    let th = Math.atan2(vy, vx);
    if (q > 0) th = Math.round(th / (Math.PI / q)) * (Math.PI / q); // sampled and held: only a few headings
    return th;
  };

  // Evenly spaced streamlines (Jobard and Lefer): a line starts only where there is room
  // and stops when it comes too close to another one.
  const dsep = Math.max(9, 280 / C);
  const dtest = dsep * 0.55;
  const step = 3;
  const gw = Math.ceil(W / dsep) + 3;
  const grid = new Map();
  const key = (x, y) => (Math.floor(y / dsep) + 1) * gw + Math.floor(x / dsep) + 1;
  const free = (x, y, d, id) => {
    const cx = Math.floor(x / dsep) + 1;
    const cy = Math.floor(y / dsep) + 1;
    for (let j = cy - 1; j <= cy + 1; j++) {
      for (let i = cx - 1; i <= cx + 1; i++) {
        const bucket = grid.get(j * gw + i);
        if (!bucket) continue;
        for (const pt of bucket) if (pt[2] !== id && (pt[0] - x) ** 2 + (pt[1] - y) ** 2 < d * d) return false;
      }
    }
    return true;
  };
  const inside = (x, y) => x > -30 && x < W + 30 && y > -30 && y < H + 30;
  const half = (x, y, sign, id) => {
    const pts = [];
    for (let i = 0; i < 700; i++) {
      const th = angle(x, y);
      x += sign * step * Math.cos(th);
      y += sign * step * Math.sin(th);
      if (!inside(x, y) || !free(x, y, dtest, id)) break;
      pts.push([x, y]);
    }
    return pts;
  };

  const lines = [];
  const add = (x, y, accent) => {
    if (!inside(x, y) || !free(x, y, dsep, -1)) return;
    const id = lines.length;
    const pts = [...half(x, y, -1, id).reverse(), [x, y], ...half(x, y, 1, id)];
    if (pts.length < 12) return;
    for (const pt of pts) {
      const k = key(pt[0], pt[1]);
      if (!grid.has(k)) grid.set(k, []);
      grid.get(k).push([pt[0], pt[1], id]);
    }
    lines.push({ pts, accent });
  };

  // Accent lines go first, threaded through the stimuli, so they always exist.
  for (let j = 0; j < nAcc; j++) {
    const ev = events[j % E];
    const t = (j / nAcc) * Math.PI * 2 + R(0, 1);
    add(ev.x + Math.cos(t) * ev.s * 0.45, ev.y + Math.sin(t) * ev.s * 0.45, true);
  }
  const seeds = [];
  for (let y = dsep / 2; y < H; y += dsep) for (let x = dsep / 2; x < W; x += dsep) seeds.push([x + R(-0.4, 0.4) * dsep, y + R(-0.4, 0.4) * dsep]);
  for (let i = seeds.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [seeds[i], seeds[j]] = [seeds[j], seeds[i]];
  }
  for (const [x, y] of seeds) add(x, y, false);

  // Lines fade with distance from the nearest stimulus, so depth comes from the events.
  const near = (x, y) => Math.max(...events.map((ev) => Math.exp(-((x - ev.x) ** 2 + (y - ev.y) ** 2) / (2 * (ev.s * 2.2) ** 2))));
  const shapes = lines.map((l) => {
    const m = l.pts[l.pts.length >> 1];
    return { pts: l.pts, accent: l.accent, fade: l.accent ? 1 : 0.3 + 0.7 * near(m[0], m[1]) };
  });
  const marks = events.map((ev) => [ev.x, ev.y, ev.s * 0.3]);
  const dots = events.map((ev) => [ev.x, ev.y]);
  return { shapes, marks, dots };
}

export const palette = {
  light: { bg: '#e4e4e0', ink: '#0d0d0d', accent: '#00629b' },
  dark: { bg: '#232321', ink: '#f0f0ec', accent: '#6cbcea' },
};

// Standalone SVG. Colours follow the viewer's light/dark preference, so the
// same file works in both themes when used as an <img>.
// `weight` scales stroke, dash and dot sizes (thumbnails use a heavier line).
export function renderSVG(options, weight = 1) {
  const { shapes, marks, dots } = generate(options);
  const n = (v) => Math.round(v);
  const { light, dark } = palette;
  let out =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<style>.b{fill:${light.bg}}.l,.m{fill:none;stroke:${light.ink};stroke-width:${1.3 * weight};stroke-linecap:round;stroke-linejoin:round}` +
    `.a{stroke:${light.accent};stroke-width:${2.8 * weight}}.m{stroke-width:${weight};stroke-opacity:.45;stroke-dasharray:${2 * weight} ${7 * weight}}` +
    `.d{fill:${light.accent}}@media(prefers-color-scheme:dark){.b{fill:${dark.bg}}.l,.m{stroke:${dark.ink}}` +
    `.a{stroke:${dark.accent}}.d{fill:${dark.accent}}}</style><rect class="b" width="${W}" height="${H}"/>`;
  const ordered = [...shapes.filter((s) => !s.accent), ...shapes.filter((s) => s.accent)];
  for (const s of ordered) {
    // every third traced point is plenty at this size and keeps the file small
    const pts = s.pts.filter((_, i) => i % 3 === 0 || i === s.pts.length - 1);
    const d = 'M' + pts.map((pt) => `${n(pt[0])} ${n(pt[1])}`).join('L');
    const o = s.fade < 0.95 ? ` stroke-opacity="${s.fade.toFixed(2)}"` : '';
    out += `<path class="l${s.accent ? ' a' : ''}"${o} d="${d}"/>`;
  }
  for (const m of marks) out += `<circle class="m" cx="${n(m[0])}" cy="${n(m[1])}" r="${n(m[2])}"/>`;
  for (const pt of dots) out += `<circle class="d" cx="${n(pt[0])}" cy="${n(pt[1])}" r="${7 * weight}"/>`;
  return out + '</svg>';
}

/** Cover options for a post: explicit `cover` frontmatter over a slug-derived default. */
export function coverOptions(slug, cover) {
  const seed = hashSeed(slug);
  const auto = {
    seed,
    mode: seed % 3 === 0 ? 'radial' : 'linear',
    channels: 14 + (seed % 13),
    events: 1 + (seed % 3),
    coupling: 0.3 + ((seed % 50) / 100),
  };
  return Object.assign({}, defaults, auto, cover || {});
}

/** The same drawing simplified for small sizes: fewer channels, drawn heavier. */
export function thumbOptions(options) {
  return Object.assign({}, options, { channels: Math.max(6, Math.round(options.channels * 0.45)) });
}
