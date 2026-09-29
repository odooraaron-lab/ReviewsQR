import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';
import { Resvg } from '@resvg/resvg-js';
import { renderSign } from './sign';
import { qrStandaloneSvg } from './qr';
import { getDesign } from './designs';
import { text } from './fonts';
import { BRAND, PRODUCT } from './config';
import type { SignInput } from './options';

// ─────────────────────────────────────────────────────────────
// WHAT THE CUSTOMER DOWNLOADS
//   sign-pack.pdf : A4 poster · 2 × A5 table signs · 4 × A6 counter cards ·
//                   the QR code on its own (all vector, prints sharp)
//   tv.png        : 1920 × 1080 slide for TVs and digital signage
//   sign.png      : the A4 sign as a high-res image (socials, email, websites)
//   qr.png/qr.svg : just the code, for menus and your own designs
// Nothing is stored: every file is drawn fresh from the order details.
// ─────────────────────────────────────────────────────────────

const MM = 72 / 25.4; // PDF points per millimetre
const A4 = { w: 210 * MM, h: 297 * MM };

export type FileId = 'pack' | 'tv' | 'sign' | 'qr-png' | 'qr-svg';

export const FILES: Record<FileId, { name: (slug: string) => string; type: string; label: string; note: string }> = {
  pack: { name: (s) => `${s}-review-sign-pack.pdf`, type: 'application/pdf', label: 'Print pack (PDF)', note: 'A4 poster, A5 table signs, A6 counter cards and the QR code on its own' },
  tv: { name: (s) => `${s}-review-tv-slide.png`, type: 'image/png', label: 'TV slide (PNG)', note: '1920 × 1080 for TVs and digital signage' },
  sign: { name: (s) => `${s}-review-sign.png`, type: 'image/png', label: 'Sign image (PNG)', note: 'High-res picture of the sign for socials, emails and websites' },
  'qr-png': { name: (s) => `${s}-review-qr.png`, type: 'image/png', label: 'QR code (PNG)', note: 'Just the code, 2000 × 2000' },
  'qr-svg': { name: (s) => `${s}-review-qr.svg`, type: 'image/svg+xml', label: 'QR code (SVG)', note: 'Just the code, vector, for designers and menus' },
};

export const isFileId = (v: string): v is FileId => v in FILES;

/** A tidy file-name prefix from the business name. */
export function fileSlug(business: string) {
  return business.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'google';
}

export async function renderFile(id: FileId, input: SignInput): Promise<Buffer> {
  switch (id) {
    case 'pack': return renderPack(input);
    case 'tv': return png(renderSign(input, { orientation: 'landscape' }), 1920);
    case 'sign': return png(renderSign(input), 2480); // A4 at 300 dpi
    case 'qr-png': return png(qrStandaloneSvg(input.url, 2000), 2000);
    case 'qr-svg': return Buffer.from(qrStandaloneSvg(input.url, 1000));
  }
}

export function png(svg: string, width: number): Buffer {
  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: width }, background: 'rgba(0,0,0,0)' }).render().asPng());
}

function cutMark(doc: PDFKit.PDFDocument, x1: number, y1: number, x2: number, y2: number) {
  doc.save().lineWidth(0.5).dash(3, { space: 3 }).strokeColor('#9CA3AF').moveTo(x1, y1).lineTo(x2, y2).stroke().undash().restore();
}

export async function renderPack(input: SignInput): Promise<Buffer> {
  const d = getDesign(input.design);
  const doc = new PDFDocument({
    size: 'A4', margin: 0, autoFirstPage: false, compress: true,
    info: { Title: `${input.business}: Google review sign`, Author: input.business, Creator: `${PRODUCT} by ${BRAND}`, Subject: 'Print-ready Google review QR code sign' },
  });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((res) => doc.on('end', () => res(Buffer.concat(chunks))));

  // svg-to-pdfkit only scales a drawing into the box when preserveAspectRatio is given.
  const svg = (s: string, x: number, y: number, w: number, h: number) => SVGtoPDF(doc, s, x, y, { width: w, height: h, preserveAspectRatio: 'xMidYMid meet', assumePt: true });
  const sign = renderSign(input);
  const place = (x: number, y: number, w: number) => svg(sign, x, y, w, w * Math.SQRT2);

  // 1 · A4 poster, edge to edge.
  doc.addPage({ size: 'A4', margin: 0 });
  place(0, 0, A4.w);

  // 2 · Two A5 table signs on one A4 (landscape page), cut down the middle.
  doc.addPage({ size: 'A4', layout: 'landscape', margin: 0 });
  place(0, 0, A4.h / 2);
  place(A4.h / 2, 0, A4.h / 2);
  cutMark(doc, A4.h / 2, 0, A4.h / 2, A4.w);

  // 3 · Four A6 counter cards on one A4, cut into quarters.
  doc.addPage({ size: 'A4', margin: 0 });
  for (const [cx, cy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) place(cx * A4.w / 2, cy * A4.h / 2, A4.w / 2);
  cutMark(doc, A4.w / 2, 0, A4.w / 2, A4.h);
  cutMark(doc, 0, A4.h / 2, A4.w, A4.h / 2);

  // 4 · The QR code on its own, with printing notes.
  doc.addPage({ size: 'A4', margin: 0 });
  const note = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1414" width="1000" height="1414"><rect width="1000" height="1414" fill="#FFFFFF"/>
    ${text(input.business, { font: 'Nunito_800ExtraBold', size: 44, x: 500, y: 150, fill: '#111827', align: 'center' })}
    ${text('Your Google review QR code', { font: 'Nunito_700Bold', size: 30, x: 500, y: 200, fill: '#6B7280', align: 'center' })}
    ${text('Add it to menus, receipts, flyers, business cards and your own designs.', { font: 'Nunito_600SemiBold', size: 24, x: 500, y: 1080, fill: '#374151', align: 'center' })}
    ${text('Print it at least 2.5 cm wide. Bigger is better for walls and windows.', { font: 'Nunito_600SemiBold', size: 24, x: 500, y: 1122, fill: '#374151', align: 'center' })}
    ${text('Keep the white border around the code, and dark code on a light background.', { font: 'Nunito_600SemiBold', size: 24, x: 500, y: 1164, fill: '#374151', align: 'center' })}
    ${text(`Design: ${d.name}`, { font: 'Nunito_600SemiBold', size: 20, x: 500, y: 1290, fill: '#9CA3AF', align: 'center' })}
  </svg>`;
  svg(note, 0, 0, A4.w, A4.h);
  const qrW = 130 * MM;
  svg(qrStandaloneSvg(input.url, 1000), (A4.w - qrW) / 2, 58 * MM, qrW, qrW);
  doc.save().fillColor('#6B7280').font('Helvetica').fontSize(8).text(`Links to: ${input.url}`, 20 * MM, 256 * MM, { width: A4.w - 40 * MM, align: 'center' }).restore();

  doc.end();
  return done;
}
