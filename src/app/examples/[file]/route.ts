import { renderSign } from '@/lib/sign';
import { png } from '@/lib/pack';
import { DESIGNS, getDesign } from '@/lib/designs';
import { EXAMPLES } from '@/lib/examples';
import { APP_URL } from '@/lib/config';

// Sample signs for the website, drawn once at build time:
//   /examples/cafe.svg (printed sign), /examples/cafe-tv.svg (TV slide), /examples/cafe.png (for Google Images)
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return DESIGNS.flatMap((d) => [{ file: `${d.id}.svg` }, { file: `${d.id}-tv.svg` }, { file: `${d.id}.png` }]);
}

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const m = file.match(/^([a-z]+)(-tv)?\.(svg|png)$/);
  const d = getDesign(m?.[1]);
  if (!m || d.id !== m[1]) return new Response('Not found', { status: 404 });
  const svg = renderSign({ ...EXAMPLES[d.id], url: APP_URL, design: d.id }, { orientation: m[2] ? 'landscape' : 'portrait' });
  const cache = 'public, max-age=86400, s-maxage=31536000';
  if (m[3] === 'png') return new Response(new Uint8Array(png(svg, 800)), { headers: { 'content-type': 'image/png', 'cache-control': cache } });
  return new Response(svg, { headers: { 'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': cache } });
}
