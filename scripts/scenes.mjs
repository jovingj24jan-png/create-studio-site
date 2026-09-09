/**
 * Scene renderers for the site's artwork.
 *
 * The reference site runs on licensed stock photography that cannot be
 * redistributed, so every image slot gets an original vector scene built to the
 * SAME SUBJECT as the reference frame it replaces (pool villa, concept car,
 * road bike, glass tower, keyboard, analytics screen, and so on), at the same
 * crop, aspect ratio and tonal key.
 *
 * Each renderer returns a full SVG string sized to the requested box.
 */

export const ACCENT = "#ff6041";

/* deterministic PRNG so repeated runs produce identical art */
export function rng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  s ||= 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
export const uid = (seed) => "x" + Math.abs([...String(seed)].reduce((a, c) => a + c.charCodeAt(0) * 7, 0));

const N = (v) => Number(v).toFixed(1);

/** Shared wrapper: defs + body + film grain. */
function svg(id, w, h, defs, body, grain = 0.07) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs>${defs}
<filter id="${id}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
</defs>${body}
<rect width="${w}" height="${h}" filter="url(#${id}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/></svg>`;
}

/** Soft vignette overlay. */
const vig = (id, w, h, top = 0.3, bot = 0.5) =>
  `<linearGradient id="${id}vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="${top}"/><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${bot}"/></linearGradient>`;
const edge = (id, o = 0.6) =>
  `<radialGradient id="${id}ed" cx="0.5" cy="0.5" r="0.74"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${o}"/></radialGradient>`;

/* ══════════════════════════════════════════════ 1. POOL VILLA (hospitality) */
export function poolVilla({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const hz = h * 0.44;          // sea horizon
  const deck = h * 0.62;        // pool coping
  const p = [];

  // sea
  p.push(`<rect x="0" y="${N(hz)}" width="${w}" height="${N(deck - hz)}" fill="url(#${id}sea)"/>`);
  for (let i = 0; i < 26; i++) {
    const y = hz + (deck - hz) * Math.pow(r(), 0.8);
    p.push(`<rect x="${N(r() * w)}" y="${N(y)}" width="${N(w * (0.03 + r() * 0.16))}" height="${N(Math.max(1, h * 0.0035))}" fill="#fff" opacity="${N(0.08 + r() * 0.3)}"/>`);
  }
  // sun glint on water
  p.push(`<ellipse cx="${N(w * 0.66)}" cy="${N(hz + (deck - hz) * 0.45)}" rx="${N(w * 0.16)}" ry="${N((deck - hz) * 0.5)}" fill="url(#${id}gl)"/>`);

  // pool coping + pool
  p.push(
    `<rect x="0" y="${N(deck - h * 0.014)}" width="${w}" height="${N(h * 0.014)}" fill="#efe8dc"/>`,
    `<rect x="0" y="${N(deck)}" width="${w}" height="${N(h - deck)}" fill="url(#${id}pool)"/>`
  );
  // caustics in the pool
  for (let i = 0; i < 40; i++) {
    const y = deck + (h - deck) * r();
    const s = w * (0.01 + r() * 0.035);
    p.push(`<ellipse cx="${N(r() * w)}" cy="${N(y)}" rx="${N(s)}" ry="${N(s * 0.32)}" fill="#eafaff" opacity="${N(0.05 + r() * 0.16)}"/>`);
  }
  // reflections of the villa in the pool
  p.push(`<rect x="${N(w * 0.05)}" y="${N(deck)}" width="${N(w * 0.3)}" height="${N((h - deck) * 0.55)}" fill="#f3ece1" opacity="0.16"/>`);

  // villa mass, left
  const vx = w * 0.03, vw = w * 0.34, vh = h * 0.3;
  p.push(
    `<rect x="${N(vx)}" y="${N(deck - vh)}" width="${N(vw)}" height="${N(vh)}" fill="url(#${id}wall)"/>`,
    `<rect x="${N(vx)}" y="${N(deck - vh)}" width="${N(vw)}" height="${N(h * 0.022)}" fill="#cdbfa9"/>`
  );
  // glazing bays
  for (let i = 0; i < 4; i++) {
    const gx = vx + vw * (0.08 + i * 0.22);
    p.push(
      `<rect x="${N(gx)}" y="${N(deck - vh * 0.74)}" width="${N(vw * 0.16)}" height="${N(vh * 0.6)}" fill="url(#${id}glass)"/>`,
      `<rect x="${N(gx)}" y="${N(deck - vh * 0.74)}" width="${N(vw * 0.16)}" height="${N(vh * 0.6)}" fill="none" stroke="#8d8272" stroke-opacity="0.5"/>`
    );
  }
  // pergola beams
  for (let i = 0; i < 9; i++) {
    const bx = vx + vw * 1.02 + i * (w * 0.028);
    p.push(`<rect x="${N(bx)}" y="${N(deck - vh * 1.02)}" width="${N(w * 0.006)}" height="${N(vh * 0.12)}" fill="#b8a headed"/>`.replace("b8a headed", "b8a894"));
  }

  // loungers on the deck
  for (let i = 0; i < 2; i++) {
    const lx = w * (0.5 + i * 0.17);
    p.push(
      `<rect x="${N(lx)}" y="${N(deck - h * 0.055)}" width="${N(w * 0.1)}" height="${N(h * 0.018)}" rx="${N(h * 0.008)}" fill="#f7f2e8"/>`,
      `<rect x="${N(lx)}" y="${N(deck - h * 0.085)}" width="${N(w * 0.03)}" height="${N(h * 0.032)}" rx="${N(h * 0.006)}" fill="#f7f2e8" transform="rotate(-16 ${N(lx)} ${N(deck - h * 0.06)})"/>`
    );
  }

  // palms right
  for (let i = 0; i < 3; i++) {
    const px = w * (0.79 + i * 0.075), ph = h * (0.28 + r() * 0.16);
    p.push(`<rect x="${N(px)}" y="${N(deck - ph)}" width="${N(Math.max(2, w * 0.005))}" height="${N(ph)}" fill="#6a6152"/>`);
    for (let k = 0; k < 7; k++) {
      const a = -160 + k * 46 + r() * 14;
      p.push(`<ellipse cx="${N(px)}" cy="${N(deck - ph)}" rx="${N(w * 0.05)}" ry="${N(h * 0.012)}" fill="#4e5a44" opacity="0.85" transform="rotate(${N(a)} ${N(px)} ${N(deck - ph)})"/>`);
    }
  }

  const defs = `
<linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc4e8"/><stop offset="0.6" stop-color="#dfeaf0"/><stop offset="1" stop-color="#f6ecdc"/></linearGradient>
<linearGradient id="${id}sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d87a3"/><stop offset="1" stop-color="#2d5e75"/></linearGradient>
<radialGradient id="${id}gl" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6df" stop-opacity="0.85"/><stop offset="1" stop-color="#fff6df" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63b6c9"/><stop offset="1" stop-color="#2b7f96"/></linearGradient>
<linearGradient id="${id}wall" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#f6f1e6"/><stop offset="1" stop-color="#d3c8b6"/></linearGradient>
<linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5d6d72"/><stop offset="0.5" stop-color="#93a5a8"/><stop offset="1" stop-color="#3f4b50"/></linearGradient>
${vig(id, w, h, 0.14, 0.24)}`;

  return svg(id, w, h, defs,
    `<rect width="${w}" height="${h}" fill="url(#${id}sky)"/>
<circle cx="${N(w * 0.7)}" cy="${N(hz * 0.42)}" r="${N(h * 0.055)}" fill="#fff8e6" opacity="0.9"/>
${p.join("")}
<rect width="${w}" height="${h}" fill="url(#${id}vg)"/>`, 0.06);
}

/* ═══════════════════════════════════════════════ 2. CONCEPT CAR (automotive) */
export function conceptCar({ seed, w, h, accent = false }) {
  const r = rng(seed), id = uid(seed);
  const gy = h * 0.78;                 // ground line
  const cy = h * 0.55;                 // body centreline
  const p = [];

  // studio sweep + floor
  p.push(`<rect x="0" y="${N(gy)}" width="${w}" height="${N(h - gy)}" fill="url(#${id}flr)"/>`);

  const bodyPath = `M${N(w * 0.06)} ${N(gy)} C ${N(w * 0.08)} ${N(cy + h * 0.06)}, ${N(w * 0.14)} ${N(cy - h * 0.02)}, ${N(w * 0.24)} ${N(cy - h * 0.06)} C ${N(w * 0.33)} ${N(cy - h * 0.19)}, ${N(w * 0.44)} ${N(cy - h * 0.24)}, ${N(w * 0.55)} ${N(cy - h * 0.22)} C ${N(w * 0.68)} ${N(cy - h * 0.2)}, ${N(w * 0.82)} ${N(cy - h * 0.12)}, ${N(w * 0.93)} ${N(cy + h * 0.01)} C ${N(w * 0.97)} ${N(cy + h * 0.06)}, ${N(w * 0.97)} ${N(gy - h * 0.02)}, ${N(w * 0.94)} ${N(gy)} Z`;

  // ground shadow
  p.push(`<ellipse cx="${N(w * 0.5)}" cy="${N(gy + h * 0.012)}" rx="${N(w * 0.44)}" ry="${N(h * 0.035)}" fill="#000" opacity="0.6" filter="url(#${id}bl)"/>`);
  // body
  p.push(`<path d="${bodyPath}" fill="url(#${id}body)"/>`);
  // greenhouse / cabin glass
  p.push(`<path d="M${N(w * 0.34)} ${N(cy - h * 0.16)} C ${N(w * 0.4)} ${N(cy - h * 0.26)}, ${N(w * 0.56)} ${N(cy - h * 0.28)}, ${N(w * 0.66)} ${N(cy - h * 0.19)} L ${N(w * 0.62)} ${N(cy - h * 0.12)} L ${N(w * 0.38)} ${N(cy - h * 0.11)} Z" fill="url(#${id}cab)"/>`);
  // shoulder crease highlight
  p.push(`<path d="M${N(w * 0.1)} ${N(cy + h * 0.03)} C ${N(w * 0.34)} ${N(cy - h * 0.09)}, ${N(w * 0.62)} ${N(cy - h * 0.11)}, ${N(w * 0.92)} ${N(cy + h * 0.02)}" fill="none" stroke="url(#${id}rim)" stroke-width="${N(h * 0.009)}"/>`);
  // lower skirt shadow
  p.push(`<path d="M${N(w * 0.1)} ${N(gy - h * 0.02)} C ${N(w * 0.36)} ${N(gy - h * 0.09)}, ${N(w * 0.66)} ${N(gy - h * 0.09)}, ${N(w * 0.92)} ${N(gy - h * 0.02)} L ${N(w * 0.92)} ${N(gy)} L ${N(w * 0.1)} ${N(gy)} Z" fill="#04050a" opacity="0.85"/>`);

  // headlight bar
  p.push(`<rect x="${N(w * 0.86)}" y="${N(cy - h * 0.05)}" width="${N(w * 0.09)}" height="${N(h * 0.014)}" rx="${N(h * 0.007)}" fill="${accent ? ACCENT : "#dfe8f2"}" opacity="0.95"/>`);

  // wheels
  [0.24, 0.75].forEach((fx) => {
    const wx = w * fx, wr = h * 0.155;
    p.push(
      `<circle cx="${N(wx)}" cy="${N(gy - wr * 0.86)}" r="${N(wr)}" fill="#08090c"/>`,
      `<circle cx="${N(wx)}" cy="${N(gy - wr * 0.86)}" r="${N(wr * 0.66)}" fill="url(#${id}rimg)"/>`,
      `<circle cx="${N(wx)}" cy="${N(gy - wr * 0.86)}" r="${N(wr * 0.22)}" fill="#1a1e24"/>`
    );
    for (let k = 0; k < 12; k++) {
      const a = (Math.PI * 2 * k) / 12;
      const cyy = gy - wr * 0.86;
      p.push(`<line x1="${N(wx + Math.cos(a) * wr * 0.24)}" y1="${N(cyy + Math.sin(a) * wr * 0.24)}" x2="${N(wx + Math.cos(a) * wr * 0.62)}" y2="${N(cyy + Math.sin(a) * wr * 0.62)}" stroke="#39414c" stroke-width="${N(wr * 0.07)}"/>`);
    }
    // arch shadow
    p.push(`<path d="M${N(wx - wr * 1.12)} ${N(gy - wr * 0.9)} a ${N(wr * 1.12)} ${N(wr * 1.12)} 0 0 1 ${N(wr * 2.24)} 0" fill="none" stroke="#04050a" stroke-width="${N(h * 0.02)}" opacity="0.75"/>`);
  });

  const defs = `
<linearGradient id="${id}bg" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#20252c"/><stop offset="0.55" stop-color="#0b0d11"/><stop offset="1" stop-color="#050609"/></linearGradient>
<radialGradient id="${id}sp" cx="0.55" cy="0.3" r="0.6"><stop offset="0" stop-color="#aab5c4" stop-opacity="0.42"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}flr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f26"/><stop offset="1" stop-color="#050609"/></linearGradient>
<linearGradient id="${id}body" x1="0.1" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#6d7887"/><stop offset="0.28" stop-color="#2d343e"/><stop offset="0.62" stop-color="#12151a"/><stop offset="1" stop-color="#07080b"/></linearGradient>
<linearGradient id="${id}cab" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#8fa0b3" stop-opacity="0.75"/><stop offset="0.6" stop-color="#2b323c"/><stop offset="1" stop-color="#0d1014"/></linearGradient>
<linearGradient id="${id}rim" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.35" stop-color="#eef3f9" stop-opacity="0.9"/><stop offset="0.72" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="${id}rimg" cx="0.36" cy="0.32" r="0.8"><stop offset="0" stop-color="#c4ccd6"/><stop offset="0.6" stop-color="#5b636e"/><stop offset="1" stop-color="#20242b"/></radialGradient>
<filter id="${id}bl" x="-30%" y="-60%" width="160%" height="260%"><feGaussianBlur stdDeviation="${N(h * 0.02)}"/></filter>
${edge(id, 0.66)}`;

  return svg(id, w, h, defs,
    `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/><rect width="${w}" height="${h}" fill="url(#${id}sp)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.08);
}

/* ═════════════════════════════════════════════════ 3. ROAD BIKE (e-mobility) */
export function roadBike({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  const gy = h * 0.84;
  const wr = h * 0.24;
  const rearX = w * 0.28, frontX = w * 0.74;
  const hubY = gy - wr;

  // wheels with spokes
  [rearX, frontX].forEach((cx) => {
    p.push(
      `<circle cx="${N(cx)}" cy="${N(hubY)}" r="${N(wr)}" fill="none" stroke="#0d0f13" stroke-width="${N(wr * 0.11)}"/>`,
      `<circle cx="${N(cx)}" cy="${N(hubY)}" r="${N(wr * 0.94)}" fill="none" stroke="#2b3038" stroke-width="${N(wr * 0.05)}"/>`
    );
    for (let k = 0; k < 22; k++) {
      const a = (Math.PI * 2 * k) / 22 + r() * 0.05;
      p.push(`<line x1="${N(cx)}" y1="${N(hubY)}" x2="${N(cx + Math.cos(a) * wr * 0.9)}" y2="${N(hubY + Math.sin(a) * wr * 0.9)}" stroke="#8d949e" stroke-opacity="0.45" stroke-width="1"/>`);
    }
    p.push(`<circle cx="${N(cx)}" cy="${N(hubY)}" r="${N(wr * 0.1)}" fill="#3d434c"/>`);
  });

  const bbX = w * 0.46, bbY = gy - wr * 0.32;      // bottom bracket
  const stX = w * 0.44, stY = hubY - wr * 0.62;    // seat top
  const htX = w * 0.68, htY = hubY - wr * 0.72;    // head tube top
  const tube = (x1, y1, x2, y2, wd) =>
    `<line x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}" stroke="url(#${id}fr)" stroke-width="${N(wd)}" stroke-linecap="round"/>`;

  // frame triangles
  p.push(
    tube(stX, stY, htX, htY, h * 0.026),            // top tube
    tube(bbX, bbY, htX, htY, h * 0.028),            // down tube
    tube(stX, stY, bbX, bbY, h * 0.024),            // seat tube
    tube(bbX, bbY, rearX, hubY, h * 0.02),          // chain stay
    tube(stX, stY, rearX, hubY, h * 0.016),         // seat stay
    tube(htX, htY, frontX, hubY, h * 0.019)         // fork
  );
  // accent panel on the down tube
  p.push(`<line x1="${N(bbX + (htX - bbX) * 0.18)}" y1="${N(bbY + (htY - bbY) * 0.18)}" x2="${N(bbX + (htX - bbX) * 0.62)}" y2="${N(bbY + (htY - bbY) * 0.62)}" stroke="${ACCENT}" stroke-width="${N(h * 0.026)}" stroke-linecap="round" opacity="0.95"/>`);

  // saddle
  p.push(`<path d="M${N(stX - w * 0.045)} ${N(stY - h * 0.012)} q ${N(w * 0.045)} ${N(-h * 0.016)} ${N(w * 0.09)} 0 q ${N(-w * 0.045)} ${N(h * 0.018)} ${N(-w * 0.09)} 0 Z" fill="#101317"/>`);
  // handlebar drops
  p.push(
    `<path d="M${N(htX - w * 0.02)} ${N(htY)} h ${N(w * 0.075)} q ${N(w * 0.035)} 0 ${N(w * 0.03)} ${N(h * 0.05)} q ${N(-w * 0.008)} ${N(h * 0.04)} ${N(-w * 0.04)} ${N(h * 0.035)}" fill="none" stroke="#14181d" stroke-width="${N(h * 0.02)}" stroke-linecap="round"/>`,
    `<circle cx="${N(htX)}" cy="${N(htY)}" r="${N(h * 0.016)}" fill="#22272e"/>`
  );
  // crank + chainring
  p.push(
    `<circle cx="${N(bbX)}" cy="${N(bbY)}" r="${N(h * 0.05)}" fill="none" stroke="#5f6772" stroke-width="${N(h * 0.008)}"/>`,
    `<line x1="${N(bbX)}" y1="${N(bbY)}" x2="${N(bbX + w * 0.03)}" y2="${N(bbY + h * 0.05)}" stroke="#3a4049" stroke-width="${N(h * 0.012)}" stroke-linecap="round"/>`,
    `<line x1="${N(bbX)}" y1="${N(bbY)}" x2="${N(rearX)}" y2="${N(hubY)}" stroke="#4a5058" stroke-width="1.5" opacity="0.8"/>`
  );

  const defs = `
<linearGradient id="${id}bg" x1="0.2" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#1c2129"/><stop offset="0.5" stop-color="#0c0f14"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<radialGradient id="${id}sp" cx="0.55" cy="0.35" r="0.6"><stop offset="0" stop-color="#94a0b0" stop-opacity="0.34"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}fr" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#464e59"/><stop offset="0.5" stop-color="#1a1e24"/><stop offset="1" stop-color="#0a0c10"/></linearGradient>
${edge(id, 0.6)}`;

  return svg(id, w, h, defs,
    `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/><rect width="${w}" height="${h}" fill="url(#${id}sp)"/>
<ellipse cx="${N(w * 0.5)}" cy="${N(gy + h * 0.02)}" rx="${N(w * 0.4)}" ry="${N(h * 0.02)}" fill="#000" opacity="0.55"/>
${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.08);
}

/* ══════════════════════════════════════════ 4. GLASS TOWER (architecture) */
export function glassTower({ seed, w, h, dark = true }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  const towers = [
    { x: w * -0.02, bw: w * 0.34, top: h * 0.02, skew: h * 0.1 },
    { x: w * 0.36, bw: w * 0.3, top: h * 0.16, skew: h * 0.07 },
    { x: w * 0.7, bw: w * 0.36, top: h * 0.06, skew: h * 0.12 },
  ];
  towers.forEach((t, i) => {
    const g = [];
    g.push(`<path d="M${N(t.x)} ${h} L ${N(t.x)} ${N(t.top)} L ${N(t.x + t.bw)} ${N(t.top + t.skew)} L ${N(t.x + t.bw)} ${h} Z" fill="url(#${id}f${i})"/>`);
    const rows = 26;
    for (let k = 1; k < rows; k++) {
      const q = k / rows;
      g.push(`<line x1="${N(t.x)}" y1="${N(t.top + (h - t.top) * q)}" x2="${N(t.x + t.bw)}" y2="${N(t.top + t.skew + (h - t.top - t.skew) * q)}" stroke="${dark ? "#b8c3d2" : "#7d7a75"}" stroke-opacity="0.17" stroke-width="1"/>`);
    }
    const cols = 9;
    for (let k = 1; k < cols; k++) {
      const x = t.x + (t.bw / cols) * k;
      g.push(`<line x1="${N(x)}" y1="${N(t.top + t.skew * (k / cols))}" x2="${N(x)}" y2="${h}" stroke="${dark ? "#b8c3d2" : "#7d7a75"}" stroke-opacity="0.12" stroke-width="1"/>`);
    }
    // lit panes
    for (let k = 0; k < 26; k++) {
      const cx0 = t.x + t.bw * ((Math.floor(r() * cols) + 0.1) / cols);
      const q = Math.floor(r() * rows) / rows;
      g.push(`<rect x="${N(cx0)}" y="${N(t.top + (h - t.top) * q)}" width="${N(t.bw / cols * 0.8)}" height="${N((h - t.top) / rows * 0.7)}" fill="${dark ? "#dfe8f5" : "#ffffff"}" opacity="${N(0.05 + r() * 0.16)}"/>`);
    }
    p.push(`<g>${g.join("")}</g>`);
  });
  // sky wedge
  p.push(`<path d="M0 0 L ${w} 0 L ${w} ${N(h * 0.14)} L 0 ${N(h * 0.26)} Z" fill="url(#${id}sk)"/>`);

  const defs = `
<linearGradient id="${id}bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="${dark ? "#1d232c" : "#f4f3f1"}"/><stop offset="1" stop-color="${dark ? "#06080b" : "#cfcdc9"}"/></linearGradient>
<linearGradient id="${id}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${dark ? "#66727f" : "#ffffff"}" stop-opacity="0.55"/><stop offset="1" stop-color="${dark ? "#0a0c10" : "#c6c4c1"}" stop-opacity="0.2"/></linearGradient>
${towers.map((t, i) => `<linearGradient id="${id}f${i}" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stop-color="${dark ? ["#333c48", "#1e242c", "#414b58"][i] : ["#e9e7e4", "#d2d0cd", "#f5f4f2"][i]}"/><stop offset="1" stop-color="${dark ? "#080a0e" : "#b7b5b2"}"/></linearGradient>`).join("")}
${edge(id, dark ? 0.62 : 0.2)}`;

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.07);
}

/* ═══════════════════════════════════════════════ 5. KEYBOARD / DEVICE close-up */
export function keyboard({ seed, w, h, dark = true }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  const rot = -9;
  const bx = w * 0.04, by = h * 0.22, bw = w * 0.92, bh = h * 0.62;
  const gx = `${N(bx + bw / 2)} ${N(by + bh / 2)}`;

  p.push(`<g transform="rotate(${rot} ${gx})">`);
  p.push(`<rect x="${N(bx)}" y="${N(by + h * 0.03)}" width="${N(bw)}" height="${N(bh)}" rx="${N(h * 0.045)}" fill="#000" opacity="0.5" filter="url(#${id}bl)"/>`);
  p.push(`<rect x="${N(bx)}" y="${N(by)}" width="${N(bw)}" height="${N(bh)}" rx="${N(h * 0.045)}" fill="url(#${id}deck)"/>`);
  // key grid
  const cols = 9, rows = 4;
  for (let ry = 0; ry < rows; ry++) {
    for (let cx0 = 0; cx0 < cols; cx0++) {
      const kx = bx + bw * 0.045 + cx0 * (bw * 0.101);
      const ky = by + bh * 0.12 + ry * (bh * 0.205);
      const kw = bw * 0.086, kh = bh * 0.16;
      p.push(
        `<rect x="${N(kx)}" y="${N(ky + kh * 0.14)}" width="${N(kw)}" height="${N(kh)}" rx="${N(h * 0.014)}" fill="#000" opacity="0.45"/>`,
        `<rect x="${N(kx)}" y="${N(ky)}" width="${N(kw)}" height="${N(kh)}" rx="${N(h * 0.014)}" fill="url(#${id}key)"/>`,
        `<rect x="${N(kx + kw * 0.1)}" y="${N(ky + kh * 0.1)}" width="${N(kw * 0.8)}" height="${N(kh * 0.3)}" rx="${N(h * 0.006)}" fill="#fff" opacity="${dark ? 0.05 : 0.5}"/>`
      );
    }
  }
  // rotary dial
  const dx = bx + bw * 0.9, dy = by + bh * 0.3, dr = h * 0.1;
  p.push(
    `<circle cx="${N(dx)}" cy="${N(dy + h * 0.012)}" r="${N(dr)}" fill="#000" opacity="0.5"/>`,
    `<circle cx="${N(dx)}" cy="${N(dy)}" r="${N(dr)}" fill="url(#${id}dial)"/>`,
    `<circle cx="${N(dx)}" cy="${N(dy)}" r="${N(dr)}" fill="none" stroke="#fff" stroke-opacity="0.28"/>`
  );
  for (let k = 0; k < 40; k++) {
    const a = (Math.PI * 2 * k) / 40;
    p.push(`<line x1="${N(dx + Math.cos(a) * dr * 0.86)}" y1="${N(dy + Math.sin(a) * dr * 0.86)}" x2="${N(dx + Math.cos(a) * dr * 0.98)}" y2="${N(dy + Math.sin(a) * dr * 0.98)}" stroke="#8e97a3" stroke-opacity="0.6"/>`);
  }
  // status LED
  p.push(`<circle cx="${N(bx + bw * 0.62)}" cy="${N(by + bh * 0.06)}" r="${N(h * 0.017)}" fill="${ACCENT}"/>`);
  p.push(`</g>`);

  const defs = `
<linearGradient id="${id}bg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${dark ? "#262c35" : "#fdfdfe"}"/><stop offset="1" stop-color="${dark ? "#080a0d" : "#d8dce1"}"/></linearGradient>
<linearGradient id="${id}deck" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${dark ? "#4b5460" : "#f4f5f7"}"/><stop offset="0.5" stop-color="${dark ? "#272d36" : "#dcdfe4"}"/><stop offset="1" stop-color="${dark ? "#0f1216" : "#b9bec6"}"/></linearGradient>
<linearGradient id="${id}key" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="${dark ? "#39414c" : "#ffffff"}"/><stop offset="1" stop-color="${dark ? "#171b21" : "#c9ced6"}"/></linearGradient>
<radialGradient id="${id}dial" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#eef1f5"/><stop offset="0.55" stop-color="#98a1ad"/><stop offset="1" stop-color="#3a4048"/></radialGradient>
<filter id="${id}bl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${N(h * 0.02)}"/></filter>
${edge(id, dark ? 0.5 : 0.14)}`;

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.07);
}

/* ════════════════════════════════════════════ 6. DATA SCREEN (SEO/analytics) */
export function dataScreen({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  const hues = [ACCENT, "#4fa3f7", "#48c78e", "#f7c948", "#a06bf0"];

  p.push(`<rect x="${N(w * 0.05)}" y="${N(h * 0.08)}" width="${N(w * 0.9)}" height="${N(h * 0.84)}" rx="${N(h * 0.03)}" fill="#0b0f16"/>`);
  const px0 = w * 0.09, py0 = h * 0.14, pw = w * 0.82, ph = h * 0.72;

  // grid
  for (let k = 0; k <= 5; k++) {
    p.push(`<line x1="${N(px0)}" y1="${N(py0 + (ph * 0.55 / 5) * k)}" x2="${N(px0 + pw)}" y2="${N(py0 + (ph * 0.55 / 5) * k)}" stroke="#28313f" stroke-width="1"/>`);
  }
  // area chart
  const pts = [];
  const nP = 14;
  for (let k = 0; k <= nP; k++) {
    const x = px0 + (pw / nP) * k;
    const y = py0 + ph * 0.55 - ph * 0.5 * (0.18 + Math.abs(Math.sin(k * 0.7 + r())) * 0.7);
    pts.push(`${N(x)} ${N(y)}`);
  }
  p.push(
    `<polyline points="${pts.join(" ")}" fill="none" stroke="${ACCENT}" stroke-width="${N(h * 0.008)}" stroke-linejoin="round"/>`,
    `<polygon points="${pts.join(" ")} ${N(px0 + pw)} ${N(py0 + ph * 0.55)} ${N(px0)} ${N(py0 + ph * 0.55)}" fill="url(#${id}area)"/>`
  );
  // second line
  const pts2 = [];
  for (let k = 0; k <= nP; k++) {
    const x = px0 + (pw / nP) * k;
    const y = py0 + ph * 0.55 - ph * 0.5 * (0.1 + Math.abs(Math.cos(k * 0.55 + 1)) * 0.45);
    pts2.push(`${N(x)} ${N(y)}`);
  }
  p.push(`<polyline points="${pts2.join(" ")}" fill="none" stroke="#4fa3f7" stroke-width="${N(h * 0.006)}" stroke-dasharray="${N(h * 0.02)} ${N(h * 0.014)}"/>`);

  // bar row
  for (let k = 0; k < 11; k++) {
    const bw2 = pw / 13;
    const bh2 = ph * 0.26 * (0.25 + r() * 0.75);
    p.push(`<rect x="${N(px0 + k * (pw / 11))}" y="${N(py0 + ph - bh2)}" width="${N(bw2)}" height="${N(bh2)}" rx="2" fill="${hues[k % hues.length]}" opacity="0.85"/>`);
  }
  // legend chips
  for (let k = 0; k < 4; k++) {
    p.push(
      `<rect x="${N(px0 + k * (pw * 0.16))}" y="${N(py0 + ph * 0.63)}" width="${N(h * 0.028)}" height="${N(h * 0.028)}" rx="2" fill="${hues[k]}"/>`,
      `<rect x="${N(px0 + k * (pw * 0.16) + h * 0.042)}" y="${N(py0 + ph * 0.638)}" width="${N(pw * 0.09)}" height="${N(h * 0.014)}" rx="2" fill="#3d485a"/>`
    );
  }
  // screen glare
  p.push(`<path d="M${N(w * 0.05)} ${N(h * 0.08)} L ${N(w * 0.45)} ${N(h * 0.08)} L ${N(w * 0.2)} ${N(h * 0.92)} L ${N(w * 0.05)} ${N(h * 0.92)} Z" fill="#fff" opacity="0.045"/>`);

  const defs = `
<linearGradient id="${id}bg" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#151b25"/><stop offset="1" stop-color="#05070b"/></linearGradient>
<linearGradient id="${id}area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ACCENT}" stop-opacity="0.5"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/></linearGradient>
${edge(id, 0.45)}`;

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.06);
}

/* ═══════════════════════════════════════════════ 7. SPHERES (abstract 3D) */
export function spheres({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  const items = [];
  for (let i = 0; i < 13; i++) {
    items.push({ x: r() * w, y: r() * h, rad: h * (0.05 + Math.pow(r(), 1.6) * 0.24), d: r() });
  }
  items.sort((a, b) => a.rad - b.rad);
  items.forEach((s, i) => {
    const g = i % 4 === 0 ? `${id}acc` : `${id}ball`;
    p.push(
      `<ellipse cx="${N(s.x + s.rad * 0.12)}" cy="${N(s.y + s.rad * 1.05)}" rx="${N(s.rad * 0.9)}" ry="${N(s.rad * 0.16)}" fill="#000" opacity="0.35" filter="url(#${id}bl)"/>`,
      `<circle cx="${N(s.x)}" cy="${N(s.y)}" r="${N(s.rad)}" fill="url(#${g})"/>`,
      `<ellipse cx="${N(s.x - s.rad * 0.34)}" cy="${N(s.y - s.rad * 0.4)}" rx="${N(s.rad * 0.26)}" ry="${N(s.rad * 0.18)}" fill="#fff" opacity="0.5"/>`
    );
  });

  const defs = `
<linearGradient id="${id}bg" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#1b212b"/><stop offset="0.55" stop-color="#0b0e13"/><stop offset="1" stop-color="#050609"/></linearGradient>
<radialGradient id="${id}ball" cx="0.34" cy="0.28" r="0.82"><stop offset="0" stop-color="#eef2f7"/><stop offset="0.45" stop-color="#8b96a5"/><stop offset="1" stop-color="#141920"/></radialGradient>
<radialGradient id="${id}acc" cx="0.34" cy="0.28" r="0.82"><stop offset="0" stop-color="#ffd0c2"/><stop offset="0.4" stop-color="${ACCENT}"/><stop offset="1" stop-color="#5c1d10"/></radialGradient>
<filter id="${id}bl" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="${N(h * 0.012)}"/></filter>
${edge(id, 0.55)}`;

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.07);
}

/* ═════════════════════════════════════════════ 8. VISOR (AI / wearable tech) */
export function visor({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const cx = w * 0.5, headY = h * 0.5, hr = h * 0.26;
  const p = [];
  p.push(
    `<path d="M${N(cx - hr * 2.1)} ${h} C ${N(cx - hr * 1.7)} ${N(h - hr * 1.1)}, ${N(cx - hr * 0.85)} ${N(headY + hr * 0.9)}, ${N(cx)} ${N(headY + hr * 0.88)} C ${N(cx + hr * 0.85)} ${N(headY + hr * 0.9)}, ${N(cx + hr * 1.7)} ${N(h - hr * 1.1)}, ${N(cx + hr * 2.1)} ${h} Z" fill="url(#${id}cl)"/>`,
    `<ellipse cx="${N(cx)}" cy="${N(headY)}" rx="${N(hr * 0.76)}" ry="${N(hr)}" fill="url(#${id}sk)"/>`,
    // visor band
    `<path d="M${N(cx - hr * 0.86)} ${N(headY - hr * 0.16)} q ${N(hr * 0.86)} ${N(-hr * 0.42)} ${N(hr * 1.72)} 0 l 0 ${N(hr * 0.42)} q ${N(-hr * 0.86)} ${N(hr * 0.4)} ${N(-hr * 1.72)} 0 Z" fill="url(#${id}vis)"/>`,
    `<path d="M${N(cx - hr * 0.86)} ${N(headY - hr * 0.16)} q ${N(hr * 0.86)} ${N(-hr * 0.42)} ${N(hr * 1.72)} 0" fill="none" stroke="#dfe9f5" stroke-opacity="0.6" stroke-width="${N(h * 0.005)}"/>`,
    // reflected highlight streak
    `<path d="M${N(cx - hr * 0.6)} ${N(headY - hr * 0.1)} l ${N(hr * 0.5)} ${N(-hr * 0.12)} l ${N(hr * 0.12)} ${N(hr * 0.3)} l ${N(-hr * 0.5)} ${N(hr * 0.12)} Z" fill="#fff" opacity="0.22"/>`,
    // hair cap
    `<path d="M${N(cx - hr * 0.8)} ${N(headY - hr * 0.3)} C ${N(cx - hr * 0.9)} ${N(headY - hr * 1.15)}, ${N(cx + hr * 0.9)} ${N(headY - hr * 1.15)}, ${N(cx + hr * 0.8)} ${N(headY - hr * 0.3)} C ${N(cx + hr * 0.55)} ${N(headY - hr * 0.72)}, ${N(cx - hr * 0.55)} ${N(headY - hr * 0.72)}, ${N(cx - hr * 0.8)} ${N(headY - hr * 0.3)} Z" fill="#191c22"/>`,
    // lips
    `<path d="M${N(cx - hr * 0.16)} ${N(headY + hr * 0.46)} q ${N(hr * 0.16)} ${N(hr * 0.13)} ${N(hr * 0.32)} 0" fill="none" stroke="#a9635a" stroke-width="${N(hr * 0.07)}" stroke-linecap="round"/>`
  );
  // HUD ticks around the visor
  for (let k = 0; k < 8; k++) {
    p.push(`<rect x="${N(cx - hr * 0.7 + k * hr * 0.2)}" y="${N(headY + hr * 0.02)}" width="${N(hr * 0.05)}" height="${N(hr * 0.05)}" fill="${ACCENT}" opacity="${N(0.3 + r() * 0.6)}"/>`);
  }

  const defs = `
<linearGradient id="${id}bg" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#141a24"/><stop offset="0.55" stop-color="#0a0d13"/><stop offset="1" stop-color="#050609"/></linearGradient>
<radialGradient id="${id}sp" cx="0.5" cy="0.4" r="0.55"><stop offset="0" stop-color="#7f8ea1" stop-opacity="0.45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}sk" x1="0.25" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#f1cbb0"/><stop offset="0.6" stop-color="#d6a184"/><stop offset="1" stop-color="#8a6048"/></linearGradient>
<linearGradient id="${id}vis" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stop-color="#3d5a86" stop-opacity="0.92"/><stop offset="0.45" stop-color="#8fb6de" stop-opacity="0.8"/><stop offset="1" stop-color="#16233a" stop-opacity="0.95"/></linearGradient>
<linearGradient id="${id}cl" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#3a424e"/><stop offset="1" stop-color="#0d1015"/></linearGradient>
${edge(id, 0.62)}`;

  return svg(id, w, h, defs,
    `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/><rect width="${w}" height="${h}" fill="url(#${id}sp)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.08);
}

/* ═══════════════════════════════════════════ 9. HOODED FIGURE (editorial) */
export function hoodFigure({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const cx = w * 0.5, top = h * 0.14, shoulder = h * 0.44;
  const p = [];
  p.push(`<ellipse cx="${N(cx)}" cy="${N(h * 0.44)}" rx="${N(w * 0.38)}" ry="${N(h * 0.42)}" fill="url(#${id}sp)"/>`);
  p.push(
    `<path d="M${N(cx)} ${N(top)} C ${N(cx - w * 0.115)} ${N(top)}, ${N(cx - w * 0.13)} ${N(shoulder - h * 0.05)}, ${N(cx - w * 0.14)} ${N(shoulder)} C ${N(cx - w * 0.235)} ${N(shoulder + h * 0.07)}, ${N(cx - w * 0.25)} ${N(h * 0.88)}, ${N(cx - w * 0.22)} ${h} L ${N(cx + w * 0.22)} ${h} C ${N(cx + w * 0.25)} ${N(h * 0.88)}, ${N(cx + w * 0.235)} ${N(shoulder + h * 0.07)}, ${N(cx + w * 0.14)} ${N(shoulder)} C ${N(cx + w * 0.13)} ${N(shoulder - h * 0.05)}, ${N(cx + w * 0.115)} ${N(top)}, ${N(cx)} ${N(top)} Z" fill="url(#${id}cl)"/>`,
    // hood opening
    `<ellipse cx="${N(cx)}" cy="${N(top + h * 0.085)}" rx="${N(w * 0.062)}" ry="${N(h * 0.072)}" fill="#04060a" opacity="0.96"/>`,
    // hood rim
    `<path d="M${N(cx - w * 0.075)} ${N(top + h * 0.09)} q ${N(w * 0.075)} ${N(-h * 0.11)} ${N(w * 0.15)} 0" fill="none" stroke="#cfd9de" stroke-opacity="0.45" stroke-width="${N(h * 0.006)}"/>`,
    // kangaroo pocket
    `<path d="M${N(cx - w * 0.115)} ${N(h * 0.72)} h ${N(w * 0.23)} v ${N(h * 0.1)} h ${N(-w * 0.23)} Z" fill="#000" opacity="0.22"/>`,
    // drawstrings
    `<line x1="${N(cx - w * 0.022)}" y1="${N(top + h * 0.15)}" x2="${N(cx - w * 0.032)}" y2="${N(h * 0.64)}" stroke="#e8eef1" stroke-opacity="0.55" stroke-width="${N(Math.max(1, w * 0.0032))}"/>`,
    `<line x1="${N(cx + w * 0.022)}" y1="${N(top + h * 0.15)}" x2="${N(cx + w * 0.037)}" y2="${N(h * 0.62)}" stroke="#e8eef1" stroke-opacity="0.55" stroke-width="${N(Math.max(1, w * 0.0032))}"/>`
  );
  // fabric folds
  for (let k = 0; k < 7; k++) {
    const fx = cx - w * 0.16 + k * w * 0.05;
    p.push(`<path d="M${N(fx)} ${N(shoulder + h * 0.06)} q ${N(w * 0.012)} ${N(h * 0.2)} ${N(-w * 0.006)} ${N(h * 0.42)}" fill="none" stroke="#000" stroke-opacity="0.14" stroke-width="${N(w * 0.008)}"/>`);
  }

  const defs = `
<linearGradient id="${id}bg" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#0f1822"/><stop offset="0.5" stop-color="#0a121a"/><stop offset="1" stop-color="#05080c"/></linearGradient>
<radialGradient id="${id}sp" cx="0.5" cy="0.4" r="0.5"><stop offset="0" stop-color="#243543" stop-opacity="0.9"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}cl" x1="0.2" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#cfd9dd"/><stop offset="0.45" stop-color="#95a5ad"/><stop offset="1" stop-color="#2e3941"/></linearGradient>
${edge(id, 0.68)}`;

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.08);
}

/* ══════════════════════════════════════════ 10. DESK PAIR (studio/team) */
export function deskPair({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const deskY = h * 0.68;
  const p = [];
  // window light
  p.push(`<rect x="${N(w * 0.52)}" y="0" width="${N(w * 0.48)}" height="${N(deskY)}" fill="url(#${id}win)"/>`);
  for (let k = 1; k < 4; k++) {
    p.push(`<line x1="${N(w * 0.52 + (w * 0.48 / 4) * k)}" y1="0" x2="${N(w * 0.52 + (w * 0.48 / 4) * k)}" y2="${N(deskY)}" stroke="#9a958c" stroke-opacity="0.3" stroke-width="${N(w * 0.004)}"/>`);
  }
  // desk
  p.push(
    `<rect x="0" y="${N(deskY)}" width="${w}" height="${N(h - deskY)}" fill="url(#${id}desk)"/>`,
    `<rect x="0" y="${N(deskY)}" width="${w}" height="${N(h * 0.012)}" fill="#d8cdbc"/>`
  );
  // two seated figures
  [0.24, 0.42].forEach((fx, i) => {
    const cx = w * fx, hr = h * 0.072;
    p.push(
      `<path d="M${N(cx - hr * 2.2)} ${N(deskY)} C ${N(cx - hr * 1.9)} ${N(deskY - h * 0.2)}, ${N(cx + hr * 1.9)} ${N(deskY - h * 0.2)}, ${N(cx + hr * 2.2)} ${N(deskY)} Z" fill="${i ? "#5f6a74" : "#3c434b"}"/>`,
      `<circle cx="${N(cx)}" cy="${N(deskY - h * 0.29)}" r="${N(hr)}" fill="${i ? "#c69b78" : "#a87a58"}"/>`,
      `<path d="M${N(cx - hr)} ${N(deskY - h * 0.3)} a ${N(hr)} ${N(hr)} 0 0 1 ${N(hr * 2)} 0 z" fill="${i ? "#3a3128" : "#241d18"}"/>`
    );
  });
  // monitor
  p.push(
    `<rect x="${N(w * 0.58)}" y="${N(deskY - h * 0.28)}" width="${N(w * 0.26)}" height="${N(h * 0.17)}" rx="${N(h * 0.008)}" fill="#14171c"/>`,
    `<rect x="${N(w * 0.592)}" y="${N(deskY - h * 0.268)}" width="${N(w * 0.236)}" height="${N(h * 0.146)}" fill="url(#${id}scr)"/>`,
    `<rect x="${N(w * 0.7)}" y="${N(deskY - h * 0.11)}" width="${N(w * 0.02)}" height="${N(h * 0.09)}" fill="#1b1f25"/>`,
    `<rect x="${N(w * 0.665)}" y="${N(deskY - h * 0.022)}" width="${N(w * 0.09)}" height="${N(h * 0.014)}" rx="3" fill="#22272e"/>`
  );
  // laptop + mug on the desk
  p.push(
    `<path d="M${N(w * 0.2)} ${N(deskY - h * 0.005)} l ${N(w * 0.14)} 0 l ${N(w * 0.02)} ${N(-h * 0.1)} l ${N(-w * 0.13)} 0 Z" fill="#2b3138"/>`,
    `<circle cx="${N(w * 0.44)}" cy="${N(deskY + h * 0.045)}" r="${N(h * 0.028)}" fill="#e8e2d6"/>`,
    `<circle cx="${N(w * 0.06)}" cy="${N(deskY + h * 0.05)}" r="${N(h * 0.035)}" fill="${ACCENT}" opacity="0.9"/>`
  );

  const defs = `
<linearGradient id="${id}bg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="#f2eee7"/><stop offset="1" stop-color="#cbc5bb"/></linearGradient>
<linearGradient id="${id}win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.98"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.2"/></linearGradient>
<linearGradient id="${id}desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfb3a1"/><stop offset="1" stop-color="#7d7365"/></linearGradient>
<linearGradient id="${id}scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a5costs"/><stop offset="1" stop-color="#2a323d"/></linearGradient>
${edge(id, 0.2)}`.replace("4a5costs", "4a5a6b");

  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.06);
}

/* ════════════════════════════════════════ 11. FABRIC FLATLAY (fashion) */
export function fabricFlat({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  for (let i = 0; i < 13; i++) {
    const y = h * (0.02 + i * 0.078);
    p.push(`<path d="M0 ${N(y)} C ${N(w * 0.28)} ${N(y + h * (0.015 + r() * 0.05))}, ${N(w * 0.72)} ${N(y - h * (0.015 + r() * 0.05))}, ${w} ${N(y + h * 0.008)}" fill="none" stroke="#ffffff" stroke-opacity="${N(0.04 + r() * 0.1)}" stroke-width="${N(h * (0.012 + r() * 0.025))}"/>`);
  }
  // folded garment block + label
  p.push(
    `<rect x="${N(w * 0.3)}" y="${N(h * 0.3)}" width="${N(w * 0.4)}" height="${N(h * 0.42)}" rx="${N(h * 0.02)}" fill="#0c0e12" opacity="0.6"/>`,
    `<rect x="${N(w * 0.36)}" y="${N(h * 0.37)}" width="${N(w * 0.28)}" height="${N(h * 0.012)}" rx="2" fill="${ACCENT}"/>`,
    `<rect x="${N(w * 0.36)}" y="${N(h * 0.42)}" width="${N(w * 0.16)}" height="${N(h * 0.01)}" rx="2" fill="#7d848f" opacity="0.7"/>`,
    `<rect x="${N(w * 0.42)}" y="${N(h * 0.55)}" width="${N(w * 0.16)}" height="${N(h * 0.1)}" rx="${N(h * 0.012)}" fill="#e9e4da" opacity="0.14"/>`
  );
  // stitching
  for (let k = 0; k < 22; k++) {
    p.push(`<rect x="${N(w * 0.3 + k * w * 0.019)}" y="${N(h * 0.3)}" width="${N(w * 0.008)}" height="${N(h * 0.006)}" fill="#fff" opacity="0.18"/>`);
  }
  const defs = `
<linearGradient id="${id}bg" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#2c2722"/><stop offset="0.5" stop-color="#16130f"/><stop offset="1" stop-color="#070606"/></linearGradient>
${edge(id, 0.6)}`;
  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.08);
}

/* ═══════════════════════════════════════ 12. BLOOM PORTRAIT (hero) */
export function bloomPortrait({ seed, w, h, petal = "#2f7fd6" }) {
  const r = rng(seed), id = uid(seed);
  const cx = w * 0.5, headY = h * 0.58, hr = h * 0.155;
  const p = [];

  p.push(
    `<path d="M${N(cx - hr * 3.2)} ${h} C ${N(cx - hr * 2.4)} ${N(h - hr * 1.5)}, ${N(cx - hr * 0.95)} ${N(headY + hr * 0.72)}, ${N(cx)} ${N(headY + hr * 0.66)} C ${N(cx + hr * 0.95)} ${N(headY + hr * 0.72)}, ${N(cx + hr * 2.4)} ${N(h - hr * 1.5)}, ${N(cx + hr * 3.2)} ${h} Z" fill="url(#${id}sk)"/>`,
    `<ellipse cx="${N(cx)}" cy="${N(headY)}" rx="${N(hr * 0.74)}" ry="${N(hr)}" fill="url(#${id}sk)"/>`,
    `<ellipse cx="${N(cx)}" cy="${N(headY + hr * 0.52)}" rx="${N(hr * 0.2)}" ry="${N(hr * 0.085)}" fill="#c9635e" opacity="0.9"/>`,
    `<ellipse cx="${N(cx)}" cy="${N(headY - hr * 0.1)}" rx="${N(hr * 0.78)}" ry="${N(hr * 0.5)}" fill="#000" opacity="0.35"/>`
  );

  const seq = [];
  for (let i = 0; i < 34; i++) {
    const a = r() * Math.PI * 2;
    const spread = Math.pow(r(), 0.62);
    seq.push({
      px: cx + Math.cos(a) * hr * 1.55 * spread,
      py: headY - hr * 0.62 + Math.sin(a) * hr * 0.78 * spread,
      depth: spread,
      pr: hr * (0.17 + (1 - spread) * 0.2 + r() * 0.12),
      rot: r() * 360,
      t: r(),
    });
  }
  seq.sort((a, b) => b.depth - a.depth);
  for (const c of seq) {
    const lit = 1 - c.depth * 0.55;
    const leaves = 6 + Math.floor(c.t * 3);
    const g = [`<ellipse cx="${N(c.pr * 0.12)}" cy="${N(c.pr * 0.2)}" rx="${N(c.pr * 1.05)}" ry="${N(c.pr * 0.95)}" fill="#04102a" opacity="${N(0.35 + c.depth * 0.3)}"/>`];
    for (let k = 0; k < leaves; k++) {
      g.push(`<ellipse cx="0" cy="${N(-c.pr * 0.58)}" rx="${N(c.pr * 0.42)}" ry="${N(c.pr * 0.7)}" transform="rotate(${N((360 / leaves) * k + c.t * 22)})" fill="url(#${id}pet)" opacity="${N(0.72 + lit * 0.28)}"/>`);
    }
    for (let k = 0; k < leaves; k++) {
      g.push(`<ellipse cx="0" cy="${N(-c.pr * 0.3)}" rx="${N(c.pr * 0.24)}" ry="${N(c.pr * 0.4)}" transform="rotate(${N((360 / leaves) * k + 26 + c.t * 22)})" fill="url(#${id}pet2)" opacity="${N(0.8 + lit * 0.2)}"/>`);
    }
    g.push(`<circle r="${N(c.pr * 0.15)}" fill="url(#${id}core)"/>`);
    p.push(`<g transform="translate(${N(c.px)} ${N(c.py)}) rotate(${N(c.rot)})" opacity="${N(0.55 + lit * 0.45)}">${g.join("")}</g>`);
  }

  const defs = `
<linearGradient id="${id}bg" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#14171c"/><stop offset="0.55" stop-color="#0a0c10"/><stop offset="1" stop-color="#050609"/></linearGradient>
<radialGradient id="${id}sp" cx="0.5" cy="0.42" r="0.55"><stop offset="0" stop-color="#7d8794" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}sk" x1="0.25" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="#f0c9ad"/><stop offset="0.6" stop-color="#d9a583"/><stop offset="1" stop-color="#8f6448"/></linearGradient>
<radialGradient id="${id}pet" cx="0.38" cy="0.12" r="1"><stop offset="0" stop-color="#8fc4f5"/><stop offset="0.35" stop-color="${petal}"/><stop offset="0.78" stop-color="#1c4d8f"/><stop offset="1" stop-color="#0b2247"/></radialGradient>
<radialGradient id="${id}pet2" cx="0.4" cy="0.15" r="1"><stop offset="0" stop-color="#b9dbfb"/><stop offset="0.5" stop-color="#3d84cf"/><stop offset="1" stop-color="#132f5c"/></radialGradient>
<radialGradient id="${id}core" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#2a4d86"/><stop offset="1" stop-color="#040e22"/></radialGradient>
${vig(id, w, h, 0.55, 0.5)}${edge(id, 0.72)}`;

  return svg(id, w, h, defs,
    `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/><rect width="${w}" height="${h}" fill="url(#${id}sp)"/>${p.join("")}<rect width="${w}" height="${h}" fill="url(#${id}vg)"/><rect width="${w}" height="${h}" fill="url(#${id}ed)"/>`, 0.09);
}

/* ════════════════════════════════════ 13. BUBBLE FIELD (statement texture) */
export function bubbleField({ seed, w, h }) {
  const r = rng(seed), id = uid(seed);
  const p = [];
  for (let i = 0; i < 70; i++) {
    const x = r() * w, y = r() * h;
    const rad = h * (0.008 + Math.pow(r(), 2.4) * 0.12);
    const blur = rad > h * 0.05 ? ` filter="url(#${id}b)"` : "";
    p.push(`<g${blur}>
<circle cx="${N(x)}" cy="${N(y)}" r="${N(rad)}" fill="none" stroke="#24272b" stroke-opacity="${N(0.3 + r() * 0.5)}" stroke-width="${N(rad * 0.17)}"/>
<ellipse cx="${N(x - rad * 0.3)}" cy="${N(y - rad * 0.34)}" rx="${N(rad * 0.3)}" ry="${N(rad * 0.19)}" fill="#fff" opacity="0.92"/>
<ellipse cx="${N(x + rad * 0.28)}" cy="${N(y + rad * 0.4)}" rx="${N(rad * 0.34)}" ry="${N(rad * 0.16)}" fill="#1c1f24" opacity="${N(0.25 + r() * 0.4)}"/></g>`);
  }
  const defs = `
<linearGradient id="${id}bg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#f8f8f8"/><stop offset="0.5" stop-color="#ececec"/><stop offset="1" stop-color="#dadcdd"/></linearGradient>
<filter id="${id}b" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="${N(h * 0.012)}"/></filter>`;
  return svg(id, w, h, defs, `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${p.join("")}`, 0.06);
}

/* ═════════════════════════════════════════════ 14. HEADSHOT (team portraits) */
export function headshot(seed) {
  const r = rng(seed), id = uid(seed);
  const w = 600, h = 750;
  const hueBg = 195 + r() * 55;
  const bgL = 62 + r() * 22;
  const skinL = 44 + r() * 26;
  const hairH = [18, 28, 34, 210, 250][Math.floor(r() * 5)];
  const cx = w / 2 + (r() - 0.5) * w * 0.06;
  const headY = h * 0.41, hr = w * 0.185;
  const longHair = r() > 0.45;

  const defs = `
<linearGradient id="${id}bg" x1="0.15" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="hsl(${hueBg.toFixed(0)},8%,${bgL.toFixed(0)}%)"/><stop offset="1" stop-color="hsl(${hueBg.toFixed(0)},8%,${(bgL - 36).toFixed(0)}%)"/></linearGradient>
<radialGradient id="${id}key" cx="0.36" cy="0.28" r="0.55"><stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}sk" x1="0.25" y1="0.1" x2="0.85" y2="1"><stop offset="0" stop-color="hsl(${(24 + r() * 10).toFixed(0)},${(34 + r() * 16).toFixed(0)}%,${(skinL + 16).toFixed(0)}%)"/><stop offset="1" stop-color="hsl(20,28%,${(skinL - 18).toFixed(0)}%)"/></linearGradient>
<linearGradient id="${id}ha" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="hsl(${hairH},${(10 + r() * 30).toFixed(0)}%,${(14 + r() * 24).toFixed(0)}%)"/><stop offset="1" stop-color="#0d0d10"/></linearGradient>
<linearGradient id="${id}cl" x1="0.1" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="hsl(${(200 + r() * 90).toFixed(0)},${(6 + r() * 14).toFixed(0)}%,${(18 + r() * 30).toFixed(0)}%)"/><stop offset="1" stop-color="#14161a"/></linearGradient>
${vig(id, w, h, 0.1, 0.3)}
<filter id="${id}soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>`;

  const body = `<rect width="${w}" height="${h}" fill="url(#${id}bg)"/>
<rect width="${w}" height="${h}" fill="url(#${id}key)"/>
<path d="M${N(cx - w * 0.46)} ${h} C ${N(cx - w * 0.4)} ${N(h * 0.76)}, ${N(cx - w * 0.22)} ${N(headY + hr * 1.02)}, ${N(cx)} ${N(headY + hr * 0.98)} C ${N(cx + w * 0.22)} ${N(headY + hr * 1.02)}, ${N(cx + w * 0.4)} ${N(h * 0.76)}, ${N(cx + w * 0.46)} ${h} Z" fill="url(#${id}cl)"/>
<path d="M${N(cx - hr * 0.34)} ${N(headY + hr * 0.5)} h ${N(hr * 0.68)} v ${N(hr * 0.62)} h ${N(-hr * 0.68)} Z" fill="hsl(20,26%,${(skinL - 16).toFixed(0)}%)"/>
${longHair ? `<path d="M${N(cx - hr * 1.16)} ${N(headY - hr * 0.2)} C ${N(cx - hr * 1.35)} ${N(headY + hr * 1.5)}, ${N(cx - hr * 0.9)} ${N(headY + hr * 2.1)}, ${N(cx - hr * 0.6)} ${N(headY + hr * 2.2)} L ${N(cx + hr * 0.6)} ${N(headY + hr * 2.2)} C ${N(cx + hr * 0.9)} ${N(headY + hr * 2.1)}, ${N(cx + hr * 1.35)} ${N(headY + hr * 1.5)}, ${N(cx + hr * 1.16)} ${N(headY - hr * 0.2)} Z" fill="url(#${id}ha)"/>` : ""}
<ellipse cx="${N(cx)}" cy="${N(headY)}" rx="${N(hr * 0.8)}" ry="${N(hr)}" fill="url(#${id}sk)"/>
<path d="M${N(cx - hr * 0.84)} ${N(headY - hr * 0.08)} C ${N(cx - hr * 0.94)} ${N(headY - hr * 1.12)}, ${N(cx + hr * 0.94)} ${N(headY - hr * 1.12)}, ${N(cx + hr * 0.84)} ${N(headY - hr * 0.08)} C ${N(cx + hr * 0.6)} ${N(headY - hr * 0.66)}, ${N(cx - hr * 0.6)} ${N(headY - hr * 0.66)}, ${N(cx - hr * 0.84)} ${N(headY - hr * 0.08)} Z" fill="url(#${id}ha)"/>
<ellipse cx="${N(cx + hr * 0.42)}" cy="${N(headY + hr * 0.1)}" rx="${N(hr * 0.5)}" ry="${N(hr * 0.86)}" fill="#000" opacity="0.16" filter="url(#${id}soft)"/>
<ellipse cx="${N(cx - hr * 0.66)}" cy="${N(headY - hr * 0.1)}" rx="${N(hr * 0.16)}" ry="${N(hr * 0.62)}" fill="#fff" opacity="0.14" filter="url(#${id}soft)"/>
<rect width="${w}" height="${h}" fill="url(#${id}vg)"/>`;

  return svg(id, w, h, defs, body, 0.07);
}

/* ═══════════════════════════════════════════════ 15. CLIENT MARK (logotype) */
export function clientMark(name, glyph) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="200" height="44">${glyph}<text x="44" y="29" font-family="Figtree, Helvetica, Arial, sans-serif" font-size="19" font-weight="600" letter-spacing="-0.7" fill="currentColor">${name}</text></svg>`;
}

export const glyphs = [
  `<circle cx="20" cy="22" r="12" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="20" cy="22" r="4" fill="currentColor"/>`,
  `<rect x="8" y="10" width="24" height="24" rx="6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M14 22h12" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M20 8l12 14-12 14L8 22z" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M8 32L20 10l12 22z" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M9 22a11 11 0 0 1 22 0" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M9 22a11 11 0 0 0 22 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="3 3"/>`,
  `<rect x="9" y="11" width="10" height="22" fill="currentColor"/><rect x="23" y="11" width="8" height="10" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<circle cx="15" cy="22" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="26" cy="22" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M10 33V11l20 22V11" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M20 9v26M9 22h22" stroke="currentColor" stroke-width="2.2"/><circle cx="20" cy="22" r="11" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
  `<path d="M10 30c6-16 14-16 20 0" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="20" cy="14" r="3.4" fill="currentColor"/>`,
];
