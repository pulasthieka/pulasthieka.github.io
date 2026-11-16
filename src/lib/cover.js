// Latent Traces — the generative system behind the blog cover images.
// Pure, dependency-free and seeded: the same options always give the same
// drawing. Used at build time (src/pages/covers/[slug].svg.js) and inlined
// into the interactive viewer (design/cover-art/viewer.html).
// See design/cover-art/philosophy.md.

export const W = 1600;
export const H = 900;

export const defaults = {
  seed: 1,
  mode: 'linear', // 'linear' = stacked traces, 'radial' = concentric rings
  channels: 22, // how many traces / rings
  events: 2, // stimuli that disturb the field
  coupling: 0.5, // 0 = every channel on its own, 1 = neighbours move together
  quantize: 0, // 0 = analogue; 3..8 = number of discrete levels
  cells: 1, // radial only: number of ring systems
  accents: 1, // channels drawn in the accent colour
};

export function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 999983 + 1;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded 2D value noise in [0, 1], smooth-stepped.
function makeNoise(rand) {
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
  const k = 1.7 + (0.12 - 1.7) * Math.min(1, Math.max(0, p.coupling));
  const nAcc = Math.max(0, Math.round(p.accents));
  const shapes = [];
  const marks = [];
  const dots = [];

  const accentSet = (events) => {
    const set = new Set();
    if (nAcc <= events.length) {
      for (let j = 0; j < nAcc; j++) set.add(Math.round(events[j].c));
    } else {
      for (let j = 0; j < nAcc; j++) set.add(Math.round(((j + 0.5) / nAcc) * (C - 1)));
    }
    return set;
  };

  if (p.mode === 'radial') {
    const layouts = {
      1: { r: 0.4, c: [[0.5, 0.5]] },
      2: { r: 0.34, c: [[0.33, 0.53], [0.67, 0.47]] },
      3: { r: 0.29, c: [[0.24, 0.57], [0.5, 0.42], [0.76, 0.58]] },
    };
    const layout = layouts[Math.min(3, Math.max(1, Math.round(p.cells)))];
    const centers = layout.c.map(([x, y]) => [x * W + R(-18, 18), y * H + R(-14, 14)]);
    const Rad = layout.r * H;
    const sp = (Rad * 0.9) / (C - 1);
    const N = 132;

    centers.forEach((ctr, ci) => {
      const events = [];
      for (let e = 0; e < E; e++) {
        let th = R(0, Math.PI * 2);
        if (e === 0 && centers.length > 1) {
          // the first stimulus of every cell reaches toward its neighbour
          const o = centers[ci === centers.length - 1 ? ci - 1 : ci + 1];
          th = Math.atan2(o[1] - ctr[1], o[0] - ctr[0]) + R(-0.18, 0.18);
        }
        events.push({
          th,
          c: R(0.5, 0.95) * (C - 1),
          sc: R(0.2, 0.45) * C,
          onset: R(0.07, 0.14),
          tau: R(0.45, 1.0),
          amp: sp * R(1.8, 3.4),
          ph: R(0, 90),
        });
      }
      const acc = accentSet(events);
      const radius = (c, th) => {
        const nx = 4 + 1.3 * Math.cos(th);
        const ny = 4 + 1.3 * Math.sin(th);
        let d = sp * 0.5 * (noise(nx + c * k * 0.35, ny + ci * 9) - 0.5);
        d += sp * 0.22 * (noise(nx * 3.1 + c * k * 0.6, ny * 3.1 + 30 + ci * 9) - 0.5);
        for (const ev of events) {
          let dt = th - ev.th;
          dt = Math.atan2(Math.sin(dt), Math.cos(dt));
          const g = Math.exp(-((c - ev.c) ** 2) / (2 * ev.sc * ev.sc));
          d += ev.amp * g * response(dt, ev.onset, ev.tau) * (0.55 + 0.45 * noise(nx + ev.ph, ny + c * k * 0.5));
        }
        if (q > 0) {
          const step = (sp * 2.4) / q;
          d = Math.round(d / step) * step;
        }
        return Rad * 0.1 + c * sp + d;
      };
      for (let c = C - 1; c >= 0; c--) {
        const pts = [];
        for (let i = 0; i < N; i++) {
          const th = (i / N) * Math.PI * 2;
          const r = radius(c, th);
          pts.push([ctr[0] + r * Math.cos(th), ctr[1] + r * Math.sin(th)]);
        }
        shapes.push({ pts, accent: acc.has(c), close: 'loop' });
      }
      for (const ev of events) {
        const far = Rad * 1.22;
        marks.push([ctr[0], ctr[1], ctr[0] + far * Math.cos(ev.th), ctr[1] + far * Math.sin(ev.th)]);
        const c = Math.round(ev.c);
        const r = radius(c, ev.th);
        dots.push([ctr[0] + r * Math.cos(ev.th), ctr[1] + r * Math.sin(ev.th)]);
      }
    });
  } else {
    const top = H * 0.2;
    const bot = H * 0.93;
    const sp = (bot - top) / (C - 1);
    const N = 120;
    const hold = q > 0 ? 2 : 1;
    const events = [];
    for (let e = 0; e < E; e++) {
      events.push({
        x: W * (0.14 + ((e + R(0.15, 0.85)) / E) * 0.6),
        c: R(0.15, 0.85) * (C - 1),
        sc: R(0.16, 0.4) * C,
        onset: R(16, 38),
        tau: R(150, 420),
        amp: sp * R(2.4, 4.6),
        ph: R(0, 90),
      });
    }
    const acc = accentSet(events);
    const level = (c, x) => {
      let d = sp * 0.5 * (noise(x * 0.011, c * k + 3.1) - 0.5);
      d += sp * 0.36 * (noise(x * 0.045, c * k * 1.6 + 40) - 0.5);
      for (const ev of events) {
        const g = Math.exp(-((c - ev.c) ** 2) / (2 * ev.sc * ev.sc));
        d += ev.amp * g * response(x - ev.x, ev.onset, ev.tau) * (0.55 + 0.45 * noise(x * 0.014 + ev.ph, c * k * 0.8 + ev.ph));
      }
      if (q > 0) {
        const step = (sp * 2.4) / q;
        d = Math.round(d / step) * step;
      }
      return top + c * sp - d;
    };
    for (let c = 0; c < C; c++) {
      const pts = [];
      let prev = null;
      for (let i = 0; i <= N; i += hold) {
        const x = -20 + (i * (W + 40)) / N;
        const y = level(c, x);
        if (q > 0 && prev !== null && prev !== y) pts.push([x, prev]);
        pts.push([x, y]);
        prev = y;
      }
      shapes.push({ pts, accent: acc.has(c), close: 'floor' });
    }
    for (const ev of events) {
      marks.push([ev.x, H * 0.06, ev.x, H * 0.96]);
      dots.push([ev.x, level(Math.round(ev.c), ev.x)]);
    }
  }

  return { shapes, marks, dots };
}

export const palette = {
  light: { bg: '#e8e4d9', ink: '#1c1a17', accent: '#2d5e9c' },
  dark: { bg: '#24211c', ink: '#ece7dc', accent: '#8fb8ee' },
};

// Standalone SVG. Colours follow the viewer's light/dark preference, so the
// same file works in both themes when used as an <img>.
export function renderSVG(options) {
  const { shapes, marks, dots } = generate(options);
  const n = (v) => Math.round(v);
  const { light, dark } = palette;
  let out =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<style>.b,.l{fill:${light.bg}}.l{stroke:${light.ink};stroke-width:1.5;stroke-linejoin:round}` +
    `.a{stroke:${light.accent};stroke-width:3}.m{stroke:${light.ink};stroke-opacity:.38;stroke-dasharray:2 8;fill:none}` +
    `.d{fill:${light.accent}}@media(prefers-color-scheme:dark){.b,.l{fill:${dark.bg}}.l,.m{stroke:${dark.ink}}` +
    `.a{stroke:${dark.accent}}.d{fill:${dark.accent}}}</style><rect class="b" width="${W}" height="${H}"/>`;
  for (const s of shapes) {
    let d = 'M' + s.pts.map((pt) => `${n(pt[0])} ${n(pt[1])}`).join('L');
    d += s.close === 'loop' ? 'Z' : `V${H + 20}H-20Z`;
    out += `<path class="l${s.accent ? ' a' : ''}" d="${d}"/>`;
  }
  for (const m of marks) out += `<path class="m" d="M${n(m[0])} ${n(m[1])}L${n(m[2])} ${n(m[3])}"/>`;
  for (const pt of dots) out += `<circle class="d" cx="${n(pt[0])}" cy="${n(pt[1])}" r="7"/>`;
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
