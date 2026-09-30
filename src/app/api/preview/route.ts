import { renderSign } from '@/lib/sign';
import { png } from '@/lib/pack';
import { cleanInput } from '@/lib/options';
import { printable } from '@/lib/fonts';
import { rateLimited } from '@/lib/guard';

export const runtime = 'nodejs';

/**
 * The live preview on the order form: /api/preview?b=Name&h=Headline&t=Thanks&u=link&d=design&o=portrait
 * Anti-piracy: a low-resolution PNG (not print-quality vector), heavily watermarked, and the QR code is a
 * sample that opens this site. The customer's own link only appears in paid downloads.
 */
export async function GET(req: Request) {
  if (rateLimited(req, 'preview', 900)) return new Response('Too many previews', { status: 429 });
  const q = new URL(req.url).searchParams;
  const input = cleanInput({ business: q.get('b'), headline: q.get('h'), thanks: q.get('t'), url: q.get('u'), design: q.get('d') });
  input.business = printable(input.business);
  input.headline = printable(input.headline);
  input.thanks = printable(input.thanks);
  const landscape = q.get('o') === 'landscape';
  const svg = renderSign({ ...input, url: '' }, { orientation: landscape ? 'landscape' : 'portrait', preview: true });
  return new Response(new Uint8Array(png(svg, landscape ? 900 : 560)), {
    headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400', 'x-robots-tag': 'noindex' },
  });
}
