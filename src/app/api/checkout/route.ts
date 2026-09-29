import { stripe } from '@/lib/stripe';
import { createOrder, setSession } from '@/lib/orders';
import { cleanInput } from '@/lib/options';
import { DESIGN_IDS, getDesign } from '@/lib/designs';
import { printable } from '@/lib/fonts';
import { rateLimited, validEmail } from '@/lib/guard';
import { fulfil } from '@/lib/fulfil';
import { APP_URL, CURRENCY, DEV_CHECKOUT, HQ_PRODUCT, PRICE_CENTS } from '@/lib/config';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (b.company) return Response.json({ error: 'Something went wrong.' }, { status: 400 }); // honeypot
  if (rateLimited(req, 'checkout', 30)) return Response.json({ error: 'Too many tries. Please wait a few minutes.' }, { status: 429 });

  const input = cleanInput(b);
  input.business = printable(input.business);
  input.headline = printable(input.headline);
  input.thanks = printable(input.thanks);
  const email = String(b.email ?? '').trim().toLowerCase().slice(0, 200);

  if (!input.business) return Response.json({ error: 'Please add your business name.', field: 'business' }, { status: 400 });
  if (!input.url) return Response.json({ error: 'That review link doesn’t look right. Copy it straight from Google and paste it in.', field: 'url' }, { status: 400 });
  if (!DESIGN_IDS.includes(input.design as never)) return Response.json({ error: 'Please pick a design.', field: 'design' }, { status: 400 });
  if (!validEmail(email)) return Response.json({ error: 'Please check your email address. We send your sign there.', field: 'email' }, { status: 400 });

  const order = await createOrder(input, email);

  // On a developer's computer without Stripe keys, skip payment so the whole flow can be tried.
  if (DEV_CHECKOUT) {
    await fulfil(order.id, 0);
    return Response.json({ url: `/order/${order.token}?new=1` });
  }

  const design = getDesign(input.design);
  const meta = { product: HQ_PRODUCT, site_slug: order.id };
  try {
    const session = await stripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [process.env.STRIPE_PRICE_ID
        ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: CURRENCY,
              unit_amount: PRICE_CENTS,
              product_data: { name: 'Google review QR sign pack', description: `${input.business} · ${design.name} design · print-ready PDF + TV slide` },
            },
          }],
      customer_email: email,
      allow_promotion_codes: true,
      metadata: meta,
      payment_intent_data: { metadata: meta, description: `Review QR sign: ${input.business}` },
      success_url: `${APP_URL}/done?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/?cancelled=1#create`,
    });
    await setSession(order.id, session.id);
    return Response.json({ url: session.url });
  } catch (e: unknown) {
    const err = e as { type?: string; message?: string };
    console.error('stripe checkout failed', err?.type, err?.message);
    return Response.json({ error: 'Payment couldn’t start. Please try again in a moment.' }, { status: 502 });
  }
}
