import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { fulfil } from '@/lib/fulfil';
import { setStatus, getOrder } from '@/lib/orders';
import { reportToHQ } from '@/lib/hq';
import { HQ_PRODUCT } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * This app's own Stripe webhook (the admin has a separate one).
 * Events: checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded
 * Every myQR site shares one Stripe account, so anything not tagged with this product is ignored.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, req.headers.get('stripe-signature') || '', process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch {
    return new Response('Bad signature', { status: 400 });
  }
  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const s = event.data.object as Stripe.Checkout.Session;
      // 'no_payment_required' is a checkout fully covered by a promotion code.
      if (s.metadata?.product === HQ_PRODUCT && s.metadata.site_slug && s.payment_status !== 'unpaid') {
        await fulfil(s.metadata.site_slug, s.amount_total ?? 0, s.id);
      }
    }
    if (event.type === 'charge.refunded') {
      // A full refund turns the download link off.
      const c = event.data.object as Stripe.Charge;
      let meta = c.metadata;
      if (meta?.product !== HQ_PRODUCT && typeof c.payment_intent === 'string') {
        meta = (await stripe().paymentIntents.retrieve(c.payment_intent)).metadata;
      }
      const id = meta?.product === HQ_PRODUCT ? meta.site_slug : null;
      if (id && c.refunded && (await getOrder(id))) {
        await setStatus(id, 'disabled');
        await reportToHQ({ type: 'site.upsert', slug: id, status: 'disabled' });
      }
    }
  } catch (e) {
    console.error('webhook failed', event.type, e);
    return new Response('Handler error', { status: 500 }); // Stripe retries
  }
  return Response.json({ received: true });
}
