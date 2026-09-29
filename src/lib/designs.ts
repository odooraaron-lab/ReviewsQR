import type { FontName } from './fonts';

// ─────────────────────────────────────────────────────────────
// THE SIX SIGN DESIGNS
// Each design is a colour scheme, a set of fonts and some background art.
// The layout (name, headline, stars, QR card, call to action) is shared,
// in src/lib/sign.ts. Everything here is plain SVG so it works the same in
// the browser preview, the PDF and the PNG. No filters, masks or patterns:
// the PDF converter doesn't support them.
//
// QR colours must stay DARK on a LIGHT card, or phones won't read them.
// ─────────────────────────────────────────────────────────────

export type Orientation = 'portrait' | 'landscape';

export type Design = {
  id: DesignId;
  name: string;
  blurb: string;
  bestFor: string;
  dark: boolean; // dark background (for the preview watermark and the gallery)
  swatch: [string, string, string]; // three colours for the picker
  fonts: { name: FontName; headline: FontName; body: FontName; small: FontName };
  upperName?: boolean;
  nameTracking?: number; // extra letter spacing, in em
  colors: { name: string; headline: string; body: string; small: string; stars: string; card: string; cardText: string; qrInk: string; qrEye: string; cardEdge?: string };
  background: (w: number, h: number, o: Orientation) => string;
  divider: (cx: number, y: number) => string;
  card?: (x: number, y: number, w: number, h: number) => string; // extras drawn on top of the card (tape etc.)
  scale?: { headline?: number; body?: number; small?: number }; // for fonts that run small (hand lettering)
  shadow?: string; // card shadow colour + opacity, e.g. '#000|0.25'
};

export type DesignId = 'midnight' | 'cafe' | 'sunset' | 'minimal' | 'fern' | 'chalk';

// ── little drawing helpers ──
const f = (v: number) => (Math.round(v * 10) / 10).toString();

/** A deterministic random generator, so the same sign always looks the same. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** True where the sign's words sit, so scattered decorations can keep out of the way. */
function busy(o: Orientation, w: number, h: number, x: number, y: number) {
  if (o === 'landscape') return x > w * 0.04 && x < w * 0.6 && y > h * 0.1 && y < h * 0.84;
  return x > w * 0.07 && x < w * 0.93 && ((y > h * 0.08 && y < h * 0.42) || (y > h * 0.86 && y < h * 0.97));
}

/** A random spot on the sign that isn't behind the words or the QR card. */
function spot(r: () => number, o: Orientation, w: number, h: number) {
  for (let i = 0; i < 40; i++) {
    const x = r() * w, y = r() * h;
    const onCard = o === 'portrait' ? x > w * 0.19 && x < w * 0.81 && y > h * 0.41 && y < h * 0.86 : x > w * 0.6 && x < w * 0.95 && y > h * 0.15 && y < h * 0.86;
    if (!busy(o, w, h, x, y) && !onCard) return [x, y];
  }
  return [r() * w * 0.05, r() * h];
}

export function starPath(cx: number, cy: number, r: number) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.47;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    d += `${i ? 'L' : 'M'}${f(cx + rad * Math.cos(a))} ${f(cy + rad * Math.sin(a))}`;
  }
  return d + 'Z';
}

const sparkle = (x: number, y: number, r: number, fill: string, op = 1) =>
  `<path d="M${f(x)} ${f(y - r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y + r)}Q${f(x)} ${f(y)} ${f(x - r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y - r)}Z" fill="${fill}" fill-opacity="${op}"/>`;

const circle = (x: number, y: number, r: number, fill: string, op = 1) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}"${op < 1 ? ` fill-opacity="${op}"` : ''}/>`;

const line = (x1: number, y1: number, x2: number, y2: number, stroke: string, w: number, op = 1) =>
  `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"${op < 1 ? ` stroke-opacity="${op}"` : ''} fill="none"/>`;

/** A fern frond: a curved stem with leaflets that shrink towards the tip. Drawn pointing down from (0,0). */
function frond(x: number, y: number, len: number, angle: number, color: string, op: number) {
  let s = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})">`;
  const bend = len * 0.12;
  s += `<path d="M0 0Q${f(bend)} ${f(len / 2)} 0 ${f(len)}" stroke="${color}" stroke-opacity="${op}" stroke-width="${f(len * 0.012 + 2)}" fill="none" stroke-linecap="round"/>`;
  const pairs = 16;
  for (let i = 1; i <= pairs; i++) {
    const t = i / (pairs + 1);
    const cy = t * len;
    const cx = 2 * (1 - t) * t * bend; // on the stem curve
    const leaf = len * 0.16 * (1 - t * 0.8);
    const w = leaf * 0.28;
    for (const side of [-1, 1]) {
      const ex = cx + side * leaf * 0.5;
      s += `<ellipse cx="${f(ex)}" cy="${f(cy + leaf * 0.12)}" rx="${f(leaf * 0.52)}" ry="${f(w)}" transform="rotate(${f(side * 28)} ${f(ex)} ${f(cy)})" fill="${color}" fill-opacity="${op}"/>`;
    }
  }
  return s + '</g>';
}

function bean(x: number, y: number, r: number, angle: number, color: string, op: number, cut: string) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})"><ellipse cx="0" cy="0" rx="${f(r * 0.72)}" ry="${f(r)}" fill="${color}" fill-opacity="${op}"/><path d="M0 ${f(-r * 0.8)}C${f(-r * 0.4)} ${f(-r * 0.25)} ${f(r * 0.4)} ${f(r * 0.25)} 0 ${f(r * 0.8)}" stroke="${cut}" stroke-width="${f(r * 0.14)}" fill="none" stroke-linecap="round"/></g>`;
}

const grad = (id: string, stops: [number, string][], x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

// ── the designs ──

const midnight: Design = {
  id: 'midnight',
  name: 'Midnight Gold',
  blurb: 'Deep plum with gold. Elegant and a little bit fancy.',
  bestFor: 'Restaurants, bars, hotels, wineries',
  dark: true,
  swatch: ['#221A3A', '#E9C46A', '#FFFFFF'],
  fonts: { name: 'PlayfairDisplay_800ExtraBold', headline: 'Lora_400Regular_Italic', body: 'Nunito_700Bold', small: 'Nunito_600SemiBold' },
  colors: { name: '#FFFFFF', headline: '#E9C46A', body: '#F1ECF8', small: '#C4B8DA', stars: '#E9C46A', card: '#FFFFFF', cardText: '#3A2E52', qrInk: '#150F26', qrEye: '#2A1F45', cardEdge: '#E9C46A' },
  shadow: '#000000|0.35',
  background(w, h, o) {
    const r = seeded(7);
    let s = `<defs>${grad('mg', [[0, '#2C2148'], [1, '#130D22']])}</defs><rect width="${w}" height="${h}" fill="url(#mg)"/>`;
    s += circle(w / 2, h * 0.62, Math.min(w, h) * 0.55, '#E9C46A', 0.06) + circle(w / 2, h * 0.62, Math.min(w, h) * 0.38, '#E9C46A', 0.05);
    for (let i = 0; i < 24; i++) { const [x, y] = spot(r, o, w, h); s += sparkle(x, y, 4 + r() * 10, '#E9C46A', 0.3 + r() * 0.45); }
    const m = 34;
    s += `<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" rx="18" fill="none" stroke="#E9C46A" stroke-width="3"/>`;
    s += `<rect x="${m + 12}" y="${m + 12}" width="${w - 2 * m - 24}" height="${h - 2 * m - 24}" rx="10" fill="none" stroke="#E9C46A" stroke-opacity="0.45" stroke-width="1.5"/>`;
    return s;
  },
  divider: (cx, y) => line(cx - 150, y, cx - 22, y, '#E9C46A', 2.5) + line(cx + 22, y, cx + 150, y, '#E9C46A', 2.5) + `<path d="M${cx} ${y - 10}L${cx + 10} ${y}L${cx} ${y + 10}L${cx - 10} ${y}Z" fill="#E9C46A"/>`,
};

const cafe: Design = {
  id: 'cafe',
  name: 'Café Latte',
  blurb: 'Warm cream, terracotta and coffee beans. Friendly and cosy.',
  bestFor: 'Cafés, bakeries, brunch spots, delis',
  dark: false,
  swatch: ['#FBF3E8', '#C8553D', '#4A2C1D'],
  fonts: { name: 'Fredoka_700Bold', headline: 'Fredoka_700Bold', body: 'Nunito_800ExtraBold', small: 'Nunito_700Bold' },
  colors: { name: '#4A2C1D', headline: '#C8553D', body: '#4A2C1D', small: '#7A5C4E', stars: '#F2A541', card: '#FFFFFF', cardText: '#7A5C4E', qrInk: '#2B1A10', qrEye: '#4A2C1D' },
  shadow: '#4A2C1D|0.14',
  background(w, h, o) {
    const r = seeded(21);
    let s = `<rect width="${w}" height="${h}" fill="#FBF3E8"/>`;
    const k = Math.min(w, h);
    s += `<path d="M${f(w * 0.62)} 0C${f(w * 0.7)} ${f(k * 0.16)} ${f(w * 0.86)} ${f(k * 0.26)} ${w} ${f(k * 0.2)}V0Z" fill="#E8A87C" fill-opacity="0.55"/>`;
    s += `<path d="M0 ${f(h * 0.74)}C${f(k * 0.16)} ${f(h * 0.78)} ${f(k * 0.26)} ${f(h * 0.9)} ${f(k * 0.22)} ${h}H0Z" fill="#A8C3A0" fill-opacity="0.55"/>`;
    s += circle(w * 0.93, h * 0.5, k * 0.14, '#F2A541', 0.18) + circle(w * 0.06, h * 0.32, k * 0.08, '#C8553D', 0.12);
    const spots = o === 'portrait'
      ? [[0.1, 0.08], [0.2, 0.2], [0.9, 0.28], [0.08, 0.55], [0.92, 0.68], [0.86, 0.9], [0.14, 0.95], [0.5, 0.97]]
      : [[0.04, 0.12], [0.12, 0.88], [0.55, 0.08], [0.58, 0.93], [0.97, 0.1], [0.96, 0.9], [0.3, 0.95], [0.03, 0.5]];
    for (const [x, y] of spots) s += bean(x * w, y * h, 16 + r() * 10, r() * 180, '#6B4226', 0.22, '#FBF3E8');
    return s;
  },
  divider: (cx, y) => `<path d="M${cx - 90} ${y}q15 -12 30 0t30 0t30 0t30 0t30 0t30 0" stroke="#C8553D" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const sunset: Design = {
  id: 'sunset',
  name: 'Sunset Pop',
  blurb: 'A bold orange-to-purple gradient with confetti. Loud and fun.',
  bestFor: 'Retail, beauty salons, takeaways, gyms',
  dark: true,
  swatch: ['#FF9A3C', '#F2545B', '#8E3FA8'],
  fonts: { name: 'Grandstander_800ExtraBold', headline: 'Grandstander_800ExtraBold', body: 'Nunito_800ExtraBold', small: 'Nunito_700Bold' },
  colors: { name: '#FFFFFF', headline: '#FFE08A', body: '#FFFFFF', small: '#FFF1E6', stars: '#FFD166', card: '#FFFFFF', cardText: '#6D2A8C', qrInk: '#2E2140', qrEye: '#6D2A8C' },
  shadow: '#4A1760|0.3',
  background(w, h, o) {
    const r = seeded(99);
    let s = `<defs>${grad('sg', [[0, '#FF9A3C'], [0.5, '#F2545B'], [1, '#8E3FA8']], 1, 1)}</defs><rect width="${w}" height="${h}" fill="url(#sg)"/>`;
    const k = Math.min(w, h);
    s += circle(w * 0.95, h * 0.05, k * 0.3, '#FFFFFF', 0.12) + circle(w * 0.02, h * 0.98, k * 0.36, '#FFFFFF', 0.1) + circle(w * 0.06, h * 0.12, k * 0.08, '#FFD166', 0.35);
    const colors = ['#FFFFFF', '#FFD166', '#FFFFFF', '#7FE0D6'];
    for (let i = 0; i < 34; i++) {
      const [x, y] = spot(r, o, w, h);
      const c = colors[i % colors.length], t = r();
      if (t < 0.4) s += circle(x, y, 5 + r() * 7, c, 0.55);
      else if (t < 0.75) s += `<rect x="${f(x)}" y="${f(y)}" width="${f(10 + r() * 10)}" height="${f(6 + r() * 4)}" rx="3" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})" fill="${c}" fill-opacity="0.6"/>`;
      else s += `<path d="M${f(x)} ${f(y)}q8 -10 16 0t16 0t16 0" stroke="${c}" stroke-opacity="0.6" stroke-width="5" fill="none" stroke-linecap="round" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
    }
    return s;
  },
  divider: (cx, y) => circle(cx - 36, y, 7, '#FFFFFF', 0.9) + circle(cx, y, 7, '#FFD166') + circle(cx + 36, y, 7, '#FFFFFF', 0.9),
};

const minimal: Design = {
  id: 'minimal',
  name: 'Clean & Simple',
  blurb: 'White, crisp and professional, with one teal accent.',
  bestFor: 'Clinics, trades, lawyers, accountants, offices',
  dark: false,
  swatch: ['#FFFFFF', '#0F766E', '#111827'],
  fonts: { name: 'Nunito_800ExtraBold', headline: 'Nunito_800ExtraBold', body: 'Nunito_700Bold', small: 'Nunito_600SemiBold' },
  upperName: true,
  nameTracking: 0.06,
  colors: { name: '#111827', headline: '#0F766E', body: '#374151', small: '#6B7280', stars: '#F5B301', card: '#FFFFFF', cardText: '#6B7280', qrInk: '#111827', qrEye: '#0B5E57', cardEdge: '#E5E7EB' },
  background(w, h) {
    let s = `<rect width="${w}" height="${h}" fill="#FFFFFF"/>`;
    const m = 40;
    s += `<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" fill="none" stroke="#111827" stroke-width="2"/>`;
    const L = 70, t = 8;
    s += `<path d="M${m} ${m + L}V${m}H${m + L}" stroke="#0F766E" stroke-width="${t}" fill="none"/>`;
    s += `<path d="M${w - m} ${h - m - L}V${h - m}H${w - m - L}" stroke="#0F766E" stroke-width="${t}" fill="none"/>`;
    return s;
  },
  divider: (cx, y) => `<rect x="${cx - 40}" y="${y - 3}" width="80" height="6" rx="3" fill="#0F766E"/>`,
};

const fern: Design = {
  id: 'fern',
  name: 'Native Bush',
  blurb: 'Deep bush green with fern fronds. Proudly Kiwi.',
  bestFor: 'Tourism, motels, garden centres, NZ-made shops',
  dark: true,
  swatch: ['#0E3B2E', '#F2C14E', '#F6F1E3'],
  fonts: { name: 'Lora_700Bold', headline: 'Lora_400Regular_Italic', body: 'Nunito_700Bold', small: 'Nunito_600SemiBold' },
  colors: { name: '#F6F1E3', headline: '#F2D38A', body: '#E6EFE9', small: '#B9D3C4', stars: '#F2C14E', card: '#FFFDF6', cardText: '#2E5A47', qrInk: '#0B2E23', qrEye: '#0E3B2E' },
  shadow: '#000000|0.3',
  background(w, h, o) {
    let s = `<defs>${grad('fg', [[0, '#0C3528'], [1, '#1B5E45']])}</defs><rect width="${w}" height="${h}" fill="url(#fg)"/>`;
    const k = Math.min(w, h);
    if (o === 'portrait') {
      s += frond(-20, -30, k * 0.85, -35, '#3E8E6A', 0.45) + frond(w + 20, -40, k * 0.7, 40, '#3E8E6A', 0.35);
      s += frond(w + 30, h * 0.62, k * 0.75, 30, '#2E7D5B', 0.4) + frond(-30, h * 0.7, k * 0.6, -30, '#2E7D5B', 0.35);
    } else {
      s += frond(-30, -40, k * 0.95, -40, '#3E8E6A', 0.45) + frond(w * 0.5, h + 40, k * 0.7, 200, '#2E7D5B', 0.3);
      s += frond(w + 30, -30, k * 0.7, 45, '#3E8E6A', 0.3) + frond(-20, h * 0.75, k * 0.5, -60, '#2E7D5B', 0.35);
    }
    s += `<path d="M0 ${h}L0 ${f(h - k * 0.08)}Q${f(w * 0.25)} ${f(h - k * 0.16)} ${f(w * 0.5)} ${f(h - k * 0.07)}T${w} ${f(h - k * 0.1)}V${h}Z" fill="#082A20" fill-opacity="0.55"/>`;
    return s;
  },
  divider: (cx, y) => `<g transform="translate(${cx} ${y}) rotate(90)"><ellipse cx="0" cy="0" rx="9" ry="30" fill="#F2C14E"/></g>` + line(cx - 140, y, cx - 44, y, '#F2C14E', 2.5, 0.8) + line(cx + 44, y, cx + 140, y, '#F2C14E', 2.5, 0.8),
};

const chalk: Design = {
  id: 'chalk',
  name: 'Chalkboard',
  blurb: 'A hand-lettered chalkboard in a timber frame.',
  bestFor: 'Cafés, bars, food trucks, markets, bakeries',
  dark: true,
  swatch: ['#2F3634', '#FFE27A', '#8A5A32'],
  fonts: { name: 'CaveatBrush_400Regular', headline: 'CaveatBrush_400Regular', body: 'CaveatBrush_400Regular', small: 'CaveatBrush_400Regular' },
  scale: { headline: 1.12, body: 1.22, small: 1.2 },
  colors: { name: '#F7F7F2', headline: '#FFE27A', body: '#F7F7F2', small: '#BFE3F5', stars: '#FFE27A', card: '#FFFFFF', cardText: '#4B5250', qrInk: '#1D2221', qrEye: '#1D2221' },
  shadow: '#000000|0.35',
  background(w, h) {
    const r = seeded(5);
    const fw = 36;
    let s = `<rect width="${w}" height="${h}" fill="#8A5A32"/>`;
    for (let i = 0; i < 10; i++) {
      const y = r() * fw;
      s += line(0, y, w, y + r() * 4, '#6E4424', 1.5, 0.5) + line(0, h - y, w, h - y - r() * 4, '#6E4424', 1.5, 0.5);
      const x = r() * fw;
      s += line(x, 0, x + r() * 4, h, '#6E4424', 1.5, 0.5) + line(w - x, 0, w - x - r() * 4, h, '#6E4424', 1.5, 0.5);
    }
    s += `<rect x="${fw}" y="${fw}" width="${w - 2 * fw}" height="${h - 2 * fw}" fill="#2F3634"/>`;
    s += `<rect x="${fw}" y="${fw}" width="${w - 2 * fw}" height="${h - 2 * fw}" fill="none" stroke="#1E2322" stroke-width="5"/>`;
    for (let i = 0; i < 7; i++) s += circle(fw + r() * (w - 2 * fw), fw + r() * (h - 2 * fw), 80 + r() * 160, '#48504D', 0.09);
    for (let i = 0; i < 220; i++) s += circle(fw + 6 + r() * (w - 2 * fw - 12), fw + 6 + r() * (h - 2 * fw - 12), 0.8 + r() * 1.6, '#FFFFFF', 0.08 + r() * 0.1);
    // A chalk heart and doodle stars in the corners.
    s += `<path d="M${fw + 70} ${fw + 88}c-14 -14 -34 0 -20 18l20 20l20 -20c14 -18 -6 -32 -20 -18z" stroke="#F7A9B5" stroke-width="4" fill="none" stroke-opacity="0.7" stroke-linejoin="round"/>`;
    s += `<path d="${starPath(w - fw - 72, fw + 90, 22)}" stroke="#FFE27A" stroke-width="3.5" fill="none" stroke-opacity="0.6" stroke-linejoin="round"/>`;
    return s;
  },
  divider: (cx, y) => `<path d="M${cx - 120} ${y + 2}c30 -9 60 6 90 -2s60 -8 90 1s40 4 30 -1" stroke="#F7F7F2" stroke-opacity="0.75" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  card: (x, y, w) => {
    const tape = (tx: number, ty: number, a: number) => `<rect x="${f(tx - 55)}" y="${f(ty - 17)}" width="110" height="34" transform="rotate(${a} ${f(tx)} ${f(ty)})" fill="#F3E3B5" fill-opacity="0.92"/>`;
    return tape(x + 18, y + 8, -38) + tape(x + w - 18, y + 8, 38);
  },
};

export const DESIGNS: Design[] = [midnight, cafe, sunset, minimal, fern, chalk];
export const DESIGN_IDS = DESIGNS.map((d) => d.id);
export const getDesign = (id: string | null | undefined) => DESIGNS.find((d) => d.id === id) ?? DESIGNS[0];
