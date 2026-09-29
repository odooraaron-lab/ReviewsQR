// Draws the favicon files from src/app/icon.svg. Run after changing the icon: node scripts/make-icons.mjs
import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = fs.readFileSync('src/app/icon.svg', 'utf8');
const png = (size, pad = 0, bg) => {
  const inner = svg.replace('<svg ', `<svg x="${pad}" y="${pad}" width="${64 - pad * 2}" height="${64 - pad * 2}" `);
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg ? `<rect width="64" height="64" fill="${bg}"/>` : ''}${inner}</svg>`;
  return Buffer.from(new Resvg(wrapped, { fitTo: { mode: 'width', value: size } }).render().asPng());
};

// favicon.ico with 16, 32 and 48 px PNGs inside (what Google's results and old browsers use).
const sizes = [16, 32, 48];
const imgs = sizes.map((s) => png(s));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(imgs[i].length, e + 8); head.writeUInt32LE(offset, e + 12);
  offset += imgs[i].length;
});
fs.writeFileSync('src/app/favicon.ico', Buffer.concat([head, ...imgs]));
fs.writeFileSync('src/app/icon1.png', png(192));
fs.writeFileSync('src/app/apple-icon.png', png(180, 7, '#F4F8FE'));
console.log('favicon.ico, icon1.png, apple-icon.png written');
