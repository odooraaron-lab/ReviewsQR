import { verifyHQRequest, reportToHQ } from '@/lib/hq';
import { getOrder, setStatus } from '@/lib/orders';
import { sendOrderEmail } from '@/lib/email';

export const runtime = 'nodejs';

/** The admin's buttons (Sites page) land here. A "site" is one order. */
export async function POST(req: Request) {
  const msg = await verifyHQRequest(req);
  if (!msg) return new Response('Unauthorized', { status: 401 });
  const o = await getOrder(msg.slug);
  if (!o) return new Response('No such order', { status: 404 });

  switch (msg.action) {
    case 'disable':
      await setStatus(o.id, 'disabled');
      await reportToHQ({ type: 'site.upsert', slug: o.id, status: 'disabled' });
      break;
    case 'enable':
      await setStatus(o.id, 'paid');
      await reportToHQ({ type: 'site.upsert', slug: o.id, status: 'live' });
      break;
    case 'extend':
      // Downloads never expire, so there's nothing to extend.
      return Response.json({ ok: true, note: 'Review QR downloads never expire.' });
    case 'resend_email':
      if (o.status !== 'paid') return Response.json({ error: 'Only paid orders can be resent.' }, { status: 409 });
      await sendOrderEmail(o, true);
      break;
    default:
      return new Response('Unknown action', { status: 400 });
  }
  return Response.json({ ok: true, slug: o.id });
}
