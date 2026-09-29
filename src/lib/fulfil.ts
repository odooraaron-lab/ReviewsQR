import { markPaid, markEmailed, getOrder, type Order } from './orders';
import { sendOrderEmail, orderLink } from './email';
import { reportToHQ } from './hq';

/**
 * After payment: mark the order paid, email the sign, tell the admin.
 * Safe to call more than once (the Stripe webhook and the thank-you page both do): only the
 * first call does the work.
 */
export async function fulfil(orderId: string, amountCents: number, sessionId?: string): Promise<Order | null> {
  const o = await markPaid(orderId, amountCents);
  if (!o) return getOrder(orderId);
  try {
    if (await sendOrderEmail(o)) await markEmailed(o.id);
  } catch (e) {
    console.error('order email failed', o.id, e);
  }
  await reportToHQ({
    type: 'site.upsert', slug: o.id, url: orderLink(o), owner_email: o.email, owner_name: o.business,
    theme: o.design, status: 'live', order_id: sessionId,
  });
  return o;
}
