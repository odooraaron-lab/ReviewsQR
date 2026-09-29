import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { stripe } from '@/lib/stripe';
import { fulfil } from '@/lib/fulfil';
import { getOrder } from '@/lib/orders';
import { HQ_PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Thank you', robots: { index: false, follow: false } };

/**
 * Stripe sends people here after paying. We check the payment ourselves (the webhook may
 * not have arrived yet), make sure the order is fulfilled, then open the download page.
 */
export default async function Done({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let token: string | null = null;
  let pending = false;
  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const s = await stripe().checkout.sessions.retrieve(session_id);
      const id = s.metadata?.product === HQ_PRODUCT ? s.metadata.site_slug : null;
      if (id) {
        if (s.payment_status !== 'unpaid') token = (await fulfil(id, s.amount_total ?? 0, s.id))?.token ?? (await getOrder(id))?.token ?? null;
        else pending = true;
      }
    } catch (e) {
      console.error('done page lookup failed', e);
    }
  }
  if (token) redirect(`/order/${token}?new=1`);

  return (
    <section className="section narrow center">
      <h1 style={{ fontSize: 'clamp(30px, 6vw, 44px)' }}>{pending ? 'Payment processing' : 'Thanks for your order!'}</h1>
      <p className="lede" style={{ margin: '0 auto 20px' }}>
        {pending
          ? 'Your payment is still being confirmed. As soon as it clears, we’ll email your sign. This page can be closed.'
          : 'We couldn’t open your downloads automatically, but your sign is on its way to your inbox. It usually arrives within a minute.'}
      </p>
      <p className="muted">Nothing after a few minutes? Check your spam folder, or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we’ll sort it out.</p>
      <Link className="btn" href="/">Back to the home page</Link>
    </section>
  );
}
