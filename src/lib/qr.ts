import QRCode from 'qrcode';

// ─────────────────────────────────────────────────────────────
// THE QR CODE
// Square data modules (the most reliable to scan in dim light and at an
// angle) with rounded corner "eyes" for a modern look. Error correction
// level Q survives about a quarter of the code being scuffed or dirty.
// ─────────────────────────────────────────────────────────────

export type QrMatrix = { size: number; dark: (r: number, c: number) => boolean };

export function qrMatrix(url: string): QrMatrix {
  const q = QRCode.create(url, { errorCorrectionLevel: url.length > 200 ? 'M' : 'Q' });
  const m = q.modules;
  return { size: m.size, dark: (r, c) => !!m.get(r, c) };
}

const n = (v: number) => (Math.round(v * 100) / 100).toString();

function inFinder(size: number, r: number, c: number) {
  const f = (a: number, b: number) => r >= a && r < a + 7 && c >= b && c < b + 7;
  return f(0, 0) || f(0, size - 7) || f(size - 7, 0);
}

function roundRect(x: number, y: number, w: number, h: number, rad: number) {
  const r = Math.min(rad, w / 2, h / 2);
  return `M${n(x + r)} ${n(y)}H${n(x + w - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w)} ${n(y + r)}V${n(y + h - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w - r)} ${n(y + h)}H${n(x + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y + h - r)}V${n(y + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}Z`;
}

/**
 * The QR code as SVG, drawn in a `width` square at (x, y). No quiet zone is added:
 * the caller puts a white card with at least 4 modules of margin behind it.
 */
export function qrSvg(url: string, o: { x: number; y: number; width: number; ink: string; eye?: string }) {
  const m = qrMatrix(url);
  const s = o.width / m.size;
  let d = '';
  // Runs of dark modules on each row, merged into one rectangle each.
  for (let r = 0; r < m.size; r++) {
    let c = 0;
    while (c < m.size) {
      if (m.dark(r, c) && !inFinder(m.size, r, c)) {
        const start = c;
        while (c < m.size && m.dark(r, c) && !inFinder(m.size, r, c)) c++;
        // A hair of overlap stops faint white lines between rows in some PDF viewers.
        d += `M${n(o.x + start * s)} ${n(o.y + r * s)}h${n((c - start) * s)}v${n(s + 0.02)}h${n(-(c - start) * s)}z`;
      } else c++;
    }
  }
  let eyes = '';
  for (const [r, c] of [[0, 0], [0, m.size - 7], [m.size - 7, 0]]) {
    const x = o.x + c * s, y = o.y + r * s;
    // Outer ring (7×7 minus 5×5), then the 3×3 centre.
    eyes += roundRect(x, y, 7 * s, 7 * s, 2.2 * s) + roundRect(x + s, y + s, 5 * s, 5 * s, 1.4 * s);
    eyes += roundRect(x + 2 * s, y + 2 * s, 3 * s, 3 * s, 0.9 * s);
  }
  return `<path d="${d}" fill="${o.ink}"/><path d="${eyes}" fill="${o.eye || o.ink}" fill-rule="evenodd"/>`;
}

/** A plain, standalone QR code SVG (with quiet zone) for people making their own designs. */
export function qrStandaloneSvg(url: string, px = 1000, ink = '#000000') {
  const m = qrMatrix(url);
  const quiet = 4;
  const unit = px / (m.size + quiet * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}"><rect width="${px}" height="${px}" fill="#ffffff"/>${qrSvg(url, { x: quiet * unit, y: quiet * unit, width: m.size * unit, ink })}</svg>`;
}
