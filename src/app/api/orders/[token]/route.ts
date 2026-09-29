import { getOrderByToken, editOrder, canEdit, EDIT_DAYS } from '@/lib/orders';
import { cleanInput } from '@/lib/options';
import { DESIGN_IDS } from '@/lib/designs';
import { printable } from '@/lib/fonts';
import { rateLimited } from '@/lib/guard';
import { reportToHQ } from '@/lib/hq';

export const runtime = 'nodejs';

/** Free changes to a paid sign (wording, design or link) for a week after paying. */
export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  if (rateLimited(req, 'edit', 40)) return Response.json({ error: 'Too many changes. Please wait a few minutes.' }, { status: 429 });
  const { token } = await ctx.params;
  const o = await getOrderByToken(token);
  if (!o) return Response.json({ error: 'Order not found.' }, { status: 404 });
  if (!canEdit(o)) return Response.json({ error: `Changes are free for ${EDIT_DAYS} days after you pay. Email us and we’ll help.` }, { status: 403 });

  const input = cleanInput(await req.json().catch(() => ({})));
  input.business = printable(input.business);
  input.headline = printable(input.headline);
  input.thanks = printable(input.thanks);
  if (!input.business) return Response.json({ error: 'Please add your business name.', field: 'business' }, { status: 400 });
  if (!input.url) return Response.json({ error: 'That review link doesn’t look right.', field: 'url' }, { status: 400 });
  if (!DESIGN_IDS.includes(input.design as never)) return Response.json({ error: 'Please pick a design.' }, { status: 400 });

  await editOrder(o, input);
  await reportToHQ({ type: 'site.upsert', slug: o.id, owner_name: input.business, theme: input.design });
  return Response.json({ ok: true });
}
