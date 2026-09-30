import { APP_URL } from './config';
import { getDesign, starPath, type Design, type Orientation } from './designs';
import { text, textPath, fitLines, capHeight, measure, type FontName } from './fonts';
import { qrSvg } from './qr';
import { CTA, CARD_CAPTION, type SignInput } from './options';

// ─────────────────────────────────────────────────────────────
// THE SIGN LAYOUT
// Portrait is 1000 × 1414 (the A-series shape, so the same drawing
// scales exactly to A4, A5 and A6). Landscape is 1920 × 1080 for TVs.
// ─────────────────────────────────────────────────────────────

export const SIZES: Record<Orientation, { w: number; h: number }> = {
  portrait: { w: 1000, h: 1414 },
  landscape: { w: 1920, h: 1080 },
};

type Slots = {
  cx: number; textW: number;
  name: { cy: number; max: number; min: number };
  divider: number;
  headline: { y: number; max: number };
  stars: { cy: number; r: number; gap: number };
  cta: { y: number; max: number };
  thanks: { y: number; max: number };
  card: { x: number; y: number; w: number; h: number; qr: number; qrTop: number; caption: number };
};

const SLOTS: Record<Orientation, Slots> = {
  portrait: {
    cx: 500, textW: 780,
    name: { cy: 238, max: 104, min: 40 },
    divider: 356,
    headline: { y: 460, max: 80 },
    stars: { cy: 536, r: 31, gap: 78 },
    card: { x: 210, y: 598, w: 580, h: 590, qr: 440, qrTop: 58, caption: 548 },
    cta: { y: 1270, max: 52 },
    thanks: { y: 1336, max: 38 },
  },
  landscape: {
    cx: 610, textW: 900,
    name: { cy: 250, max: 124, min: 48 },
    divider: 402,
    headline: { y: 512, max: 96 },
    stars: { cy: 604, r: 38, gap: 94 },
    card: { x: 1190, y: 190, w: 600, h: 700, qr: 480, qrTop: 60, caption: 634 },
    cta: { y: 752, max: 62 },
    thanks: { y: 836, max: 46 },
  },
};

function fitOne(str: string, font: FontName, width: number, max: number) {
  const w = measure(str, font, max);
  return w > width ? Math.max(20, (max * width) / w) : max;
}

const sizeFor = (str: string, font: FontName, width: number, max: number, scale = 1) => fitOne(str, font, width, max * scale);

export type RenderOptions = { orientation?: Orientation; preview?: boolean };

/** The whole sign as an SVG document. */
export function renderSign(input: SignInput, opts: RenderOptions = {}): string {
  const o = opts.orientation ?? 'portrait';
  const d: Design = getDesign(input.design);
  const { w, h } = SIZES[o];
  const L = SLOTS[o];
  const c = d.colors;
  let body = d.background(w, h, o);

  // Business name: as big as fits, on one or two lines.
  const nameText = (input.business || 'Your Business Name').trim();
  const nameStr = d.upperName ? nameText.toUpperCase() : nameText;
  const em = d.nameTracking ?? 0;
  const fit = fitLines(nameStr, d.fonts.name, L.textW, L.name.max, L.name.min, 2, em * L.name.max);
  const cap = capHeight(d.fonts.name, fit.size);
  const gap = fit.size * 1.12;
  const top = L.name.cy - (cap + gap * (fit.lines.length - 1)) / 2;
  fit.lines.forEach((ln, i) => {
    body += text(ln, { font: d.fonts.name, size: fit.size, x: L.cx, y: top + cap + i * gap, fill: c.name, align: 'center', tracking: em * fit.size });
  });

  body += d.divider(L.cx, L.divider);

  const headline = input.headline.trim();
  if (headline) {
    body += text(headline, { font: d.fonts.headline, size: sizeFor(headline, d.fonts.headline, L.textW, L.headline.max, d.scale?.headline), x: L.cx, y: L.headline.y, fill: c.headline, align: 'center' });
  }

  // Five stars, with softly rounded points.
  let stars = '';
  for (let i = -2; i <= 2; i++) stars += starPath(L.cx + i * L.stars.gap, L.stars.cy, L.stars.r);
  body += `<path d="${stars}" fill="${c.stars}" stroke="${c.stars}" stroke-width="${(L.stars.r * 0.16).toFixed(1)}" stroke-linejoin="round"/>`;

  body += text(CTA, { font: d.fonts.body, size: sizeFor(CTA, d.fonts.body, L.textW, L.cta.max, d.scale?.body), x: L.cx, y: L.cta.y, fill: c.body, align: 'center' });
  const thanks = input.thanks.trim();
  if (thanks) body += text(thanks, { font: d.fonts.small, size: sizeFor(thanks, d.fonts.small, L.textW, L.thanks.max, d.scale?.small), x: L.cx, y: L.thanks.y, fill: c.small, align: 'center' });

  if (opts.preview) body += watermark(w, h, d.dark);

  // The QR card, drawn last so nothing ever covers the code.
  const k = L.card;
  if (d.shadow) {
    const [col, op] = d.shadow.split('|');
    body += `<rect x="${k.x + 6}" y="${k.y + 14}" width="${k.w}" height="${k.h}" rx="34" fill="${col}" fill-opacity="${op}"/>`;
  }
  body += `<rect x="${k.x}" y="${k.y}" width="${k.w}" height="${k.h}" rx="34" fill="${c.card}"${c.cardEdge ? ` stroke="${c.cardEdge}" stroke-width="4"` : ''}/>`;
  if (d.card) body += d.card(k.x, k.y, k.w, k.h);
  // Previews never contain the customer's link: the sample code opens our own site instead.
  const url = opts.preview ? `${APP_URL}/?sample=1` : input.url || APP_URL;
  body += qrSvg(url, { x: k.x + (k.w - k.qr) / 2, y: k.y + k.qrTop, width: k.qr, ink: c.qrInk, eye: c.qrEye });
  const capSize = o === 'portrait' ? 27 : 30;
  body += cameraIcon(k.x + k.w / 2 - measure(CARD_CAPTION, 'Nunito_700Bold', capSize) / 2 - 26, k.y + k.caption - capSize * 0.36, c.cardText);
  body += text(CARD_CAPTION, { font: 'Nunito_700Bold', size: capSize, x: k.x + k.w / 2 + 16, y: k.y + k.caption, fill: c.cardText, align: 'center' });

  // Preview protection, on top of everything (including the code): a second watermark layer and a banner.
  if (opts.preview) body += overlay(w, h, k);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
}

function cameraIcon(cx: number, cy: number, color: string) {
  return `<g fill="none" stroke="${color}" stroke-width="3.2" stroke-linejoin="round"><rect x="${cx - 17}" y="${cy - 11}" width="34" height="24" rx="6"/><circle cx="${cx}" cy="${cy + 1}" r="6.5"/><path d="M${cx - 7} ${cy - 11}l3 -5h8l3 5"/></g>`;
}

/** "PREVIEW" repeated across the background. */
function watermark(w: number, h: number, dark: boolean) {
  const fill = dark ? '#FFFFFF' : '#2E2140';
  // Drawn once, then repeated with <use> to keep the preview small (the preview is never printed).
  let s = `<defs><path id="wm" d="${textPath('PREVIEW', 'Nunito_800ExtraBold', 64, 0, 0, 6)}"/></defs>`;
  s += `<g transform="rotate(-24 ${w / 2} ${h / 2})" fill="${fill}" fill-opacity="${dark ? 0.2 : 0.16}">`;
  let row = 0;
  for (let y = -h * 0.2; y < h * 1.2; y += 230, row++) {
    for (let x = -w * 0.3 + (row % 2) * 190; x < w * 1.3; x += 420) s += `<use href="#wm" x="${Math.round(x)}" y="${Math.round(y)}"/>`;
  }
  return s + '</g>';
}

/** Over the finished preview: faint PREVIEW text across the QR card and a solid banner through the middle. */
function overlay(w: number, h: number, k: { x: number; y: number; w: number; h: number }) {
  const cx = k.x + k.w / 2, cy = k.y + k.h / 2;
  let s = `<g transform="rotate(-24 ${cx} ${cy})" fill="#2E2140" fill-opacity="0.22">`;
  for (let y = k.y - 120; y < k.y + k.h + 200; y += 150) s += `<use href="#wm" x="${Math.round(cx - 330)}" y="${Math.round(y)}"/><use href="#wm" x="${Math.round(cx + 40)}" y="${Math.round(y + 75)}"/>`;
  s += '</g>';
  const label = 'PREVIEW · NOT FOR PRINT';
  const size = Math.min(w, h) * 0.05;
  const bandH = size * 2;
  s += `<g transform="rotate(-24 ${cx} ${cy})"><rect x="${-w}" y="${cy - bandH / 2}" width="${w * 3}" height="${bandH}" fill="#C23A64" fill-opacity="0.9"/>`;
  s += text(label, { font: 'Nunito_800ExtraBold', size, x: cx, y: cy + size * 0.36, fill: '#FFFFFF', align: 'center', tracking: size * 0.08 });
  return s + '</g>';
}
