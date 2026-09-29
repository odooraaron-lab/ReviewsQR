import { getOrderByToken, countDownload, signInput } from '@/lib/orders';
import { renderFile, isFileId, FILES, fileSlug } from '@/lib/pack';
import { renderSign } from '@/lib/sign';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * A paid customer's files: /api/files/<token>/pack (or tv, sign, qr-png, qr-svg).
 * `view-portrait` / `view-landscape` show the sign on the order page without counting a download.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ token: string; file: string }> }) {
  const { token, file } = await ctx.params;
  const o = await getOrderByToken(token);
  if (!o) return new Response('Not found', { status: 404 });
  if (o.status === 'pending') return new Response('This order hasn’t been paid for yet.', { status: 402 });
  if (o.status === 'disabled') return new Response('These downloads have been turned off. Please get in touch if that’s a surprise.', { status: 403 });

  const headers = { 'cache-control': 'private, max-age=3600', 'x-robots-tag': 'noindex' };
  if (file === 'view-portrait' || file === 'view-landscape') {
    const svg = renderSign(signInput(o), { orientation: file === 'view-landscape' ? 'landscape' : 'portrait' });
    return new Response(svg, { headers: { ...headers, 'content-type': 'image/svg+xml; charset=utf-8' } });
  }
  if (!isFileId(file)) return new Response('Not found', { status: 404 });

  let body: Buffer;
  try {
    body = await renderFile(file, signInput(o));
  } catch (e) {
    console.error('file render failed', file, o.id, e);
    return new Response('Sorry, this file couldn’t be made just now. Please try again in a minute, or reply to your order email.', { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  await countDownload(o.id).catch(() => {});
  return new Response(new Uint8Array(body), {
    headers: {
      ...headers,
      'content-type': FILES[file].type,
      'content-disposition': `attachment; filename="${FILES[file].name(fileSlug(o.business))}"`,
    },
  });
}
