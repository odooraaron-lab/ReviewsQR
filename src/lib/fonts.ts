import fs from 'node:fs';
import path from 'node:path';
import * as fontkit from 'fontkit';

// ─────────────────────────────────────────────────────────────
// TEXT AS SHAPES
// Every word on a sign is turned into vector outlines with the real
// font file, so the preview, the PDF and the PNG look identical, print
// sharp at any size, and never depend on fonts being installed.
// Fonts live in /fonts (Google Fonts, SIL Open Font Licence).
// ─────────────────────────────────────────────────────────────

export type FontName =
  | 'Nunito_600SemiBold' | 'Nunito_700Bold' | 'Nunito_800ExtraBold'
  | 'Grandstander_800ExtraBold' | 'PlayfairDisplay_800ExtraBold' | 'Fredoka_700Bold'
  | 'Lora_700Bold' | 'Lora_400Regular_Italic' | 'CaveatBrush_400Regular';

const DIR = path.join(process.cwd(), 'fonts');
const cache = new Map<string, fontkit.Font>();

export function font(name: FontName): fontkit.Font {
  let f = cache.get(name);
  if (!f) {
    f = fontkit.create(fs.readFileSync(path.join(DIR, `${name}.ttf`))) as fontkit.Font;
    cache.set(name, f);
  }
  return f;
}

// If a font lacks a character (a macron, say), Nunito draws it instead.
const FALLBACK: FontName = 'Nunito_800ExtraBold';

type Run = { f: fontkit.Font; text: string };

function runs(text: string, name: FontName): Run[] {
  const main = font(name);
  const fb = font(FALLBACK);
  const out: Run[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    const f = main.hasGlyphForCodePoint(cp) ? main : fb.hasGlyphForCodePoint(cp) ? fb : null;
    if (!f) continue; // emoji and other characters no font can draw are left out
    const last = out[out.length - 1];
    if (last && last.f === f) last.text += ch;
    else out.push({ f, text: ch });
  }
  return out;
}

/** Characters none of our fonts can draw (emoji etc.) are removed before anything is saved. */
export function printable(text: string, name: FontName = 'Nunito_800ExtraBold') {
  return runs(text, name).map((r) => r.text).join('').replace(/\s+/g, ' ').trim();
}

/** Width of `text` in px at `size`. */
export function measure(text: string, name: FontName, size: number, tracking = 0) {
  let w = 0;
  let count = 0;
  for (const r of runs(text, name)) {
    const run = r.f.layout(r.text);
    for (const p of run.positions) { w += p.xAdvance * size / r.f.unitsPerEm; count++; }
  }
  return w + Math.max(0, count - 1) * tracking;
}

const n = (v: number) => (Math.round(v * 10) / 10).toString();

/** SVG path data for `text` with its left edge at x and its baseline at y. */
export function textPath(text: string, name: FontName, size: number, x: number, y: number, tracking = 0) {
  let d = '';
  let pen = x;
  for (const r of runs(text, name)) {
    const s = size / r.f.unitsPerEm;
    const run = r.f.layout(r.text);
    run.glyphs.forEach((g, i) => {
      const p = run.positions[i];
      const ox = pen + p.xOffset * s;
      const oy = y - p.yOffset * s;
      for (const c of g.path.commands) {
        const a = c.args;
        const pt = (k: number) => `${n(ox + a[k] * s)} ${n(oy - a[k + 1] * s)}`;
        switch (c.command) {
          case 'moveTo': d += `M${pt(0)}`; break;
          case 'lineTo': d += `L${pt(0)}`; break;
          case 'quadraticCurveTo': d += `Q${pt(0)} ${pt(2)}`; break;
          case 'bezierCurveTo': d += `C${pt(0)} ${pt(2)} ${pt(4)}`; break;
          case 'closePath': d += 'Z'; break;
        }
      }
      pen += p.xAdvance * s + tracking;
    });
  }
  return d;
}

export type Align = 'left' | 'center' | 'right';

/** A <path> element for one line of text. */
export function text(str: string, o: { font: FontName; size: number; x: number; y: number; fill: string; align?: Align; tracking?: number; opacity?: number }) {
  const w = measure(str, o.font, o.size, o.tracking);
  const x = o.align === 'center' ? o.x - w / 2 : o.align === 'right' ? o.x - w : o.x;
  const d = textPath(str, o.font, o.size, x, o.y, o.tracking);
  if (!d) return '';
  return `<path d="${d}" fill="${o.fill}"${o.opacity != null ? ` fill-opacity="${o.opacity}"` : ''}/>`;
}

/** Cap height of a font in px at `size` (for centring text on shapes). */
export function capHeight(name: FontName, size: number) {
  const f = font(name);
  return (f.capHeight || f.ascent * 0.7) * size / f.unitsPerEm;
}

/**
 * The largest size (≤ maxSize) at which `str` fits on up to `maxLines` lines of `width`.
 * Long names break at the space that gives the most even lines.
 */
export function fitLines(str: string, name: FontName, width: number, maxSize: number, minSize: number, maxLines = 2, tracking = 0): { lines: string[]; size: number } {
  const words = str.trim().split(/\s+/);
  const oneLine = (s: string) => Math.min(maxSize, (maxSize * width) / Math.max(1, measure(s, name, maxSize, tracking)));
  let best = { lines: [str.trim()], size: oneLine(str.trim()) };
  if (maxLines >= 2 && words.length > 1 && best.size < maxSize * 0.8) {
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' ');
      const b = words.slice(i).join(' ');
      // Two lines never go as big as one: keep the name from shouting.
      const size = Math.min(oneLine(a), oneLine(b), maxSize * 0.8);
      if (size > best.size * 1.12) best = { lines: [a, b], size };
    }
  }
  best.size = Math.max(minSize, best.size);
  return best;
}
