import { renderSign } from '@/lib/sign';
import { cleanInput } from '@/lib/options';
import { printable } from '@/lib/fonts';
import { rateLimited } from '@/lib/guard';

export const runtime = 'nodejs';

/**
 * The live preview on the order form: /api/preview?b=Name&h=Headline&t=Thanks&u=link&d=design&o=portrait
 * Watermarked, but the QR code is real so people can scan it to test their link before paying.
 */
export async function GET(req: Request) {
  if (rateLimited(req, 'preview', 900)) return new Response('Too many previews', { status: 429 });
  const q = new URL(req.url).searchParams;
  const input = cleanInput({ business: q.get('b'), headline: q.get('h'), thanks: q.get('t'), url: q.get('u'), design: q.get('d') });
  input.business = printable(input.business);
  input.headline = printable(input.headline);
  input.thanks = printable(input.thanks);
  const svg = renderSign(input, { orientation: q.get('o') === 'landscape' ? 'landscape' : 'portrait', preview: true });
  return new Response(svg, {
    headers: { 'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': 'public, max-age=86400', 'x-robots-tag': 'noindex' },
  });
}
