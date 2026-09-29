import { renderSign } from '@/lib/sign';
import { png } from '@/lib/pack';
import { text } from '@/lib/fonts';
import { EXAMPLES } from '@/lib/examples';
import { APP_URL, APP_HOST, PRICE_LABEL } from '@/lib/config';

// The picture shown when the site is shared on Facebook, LinkedIn, iMessage, Slack etc.
// Drawn with the same renderer as the signs, so the example on it is a real sign.
export const alt = 'Review QR: Google review QR code signs, ready to print';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const nest = (svg: string, x: number, y: number, w: number, h: number) =>
  svg.replace('<svg ', `<svg x="${x}" y="${y}" `).replace(/width="\d+" height="\d+"/, `width="${w}" height="${h}"`);

export default function OgImage() {
  const cafe = renderSign({ ...EXAMPLES.cafe, url: APP_URL, design: 'cafe' });
  const night = renderSign({ ...EXAMPLES.midnight, url: APP_URL, design: 'midnight' });
  const t = (s: string, size: number, y: number, fill: string, font: Parameters<typeof text>[1]['font'] = 'Nunito_800ExtraBold') =>
    text(s, { font, size, x: 70, y, fill });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <rect width="1200" height="630" fill="#2E2140"/>
    <circle cx="1010" cy="330" r="330" fill="#FFC857" fill-opacity="0.08"/>
    ${t('GOOGLE REVIEW QR CODE SIGNS', 26, 132, '#FFC857')}
    ${t('Get more', 74, 230, '#FFFFFF', 'Grandstander_800ExtraBold')}
    ${t('Google reviews', 74, 314, '#FFFFFF', 'Grandstander_800ExtraBold')}
    ${t('Print-ready PDF + TV slide.', 32, 392, '#E6DEF2', 'Nunito_700Bold')}
    ${t(`No sign-up. Just ${PRICE_LABEL} NZD.`, 32, 440, '#E6DEF2', 'Nunito_700Bold')}
    ${t(APP_HOST, 26, 546, '#FFC857')}
    <g transform="rotate(-6 800 340)">${nest(night, 700, 80, 300, 424)}</g>
    <g transform="rotate(5 960 330)">${nest(cafe, 860, 110, 300, 424)}</g>
  </svg>`;
  return new Response(new Uint8Array(png(svg, 1200)), { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' } });
}
