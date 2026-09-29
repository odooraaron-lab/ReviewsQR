import { pageMeta } from '@/lib/seo';
import { BRAND, PRODUCT, SUPPORT_EMAIL, PRICE_LABEL } from '@/lib/config';

export const metadata = pageMeta('/terms', `Terms | ${PRODUCT} by ${BRAND}`, `The terms for buying a ${PRODUCT} Google review QR code sign.`);

export default function Terms() {
  return (
    <section className="section narrow legal">
      <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)' }}>Terms</h1>
      <p className="muted">Last updated 29 September 2026</p>
      <h2>What you’re buying</h2>
      <p>A digital pack of files for one sign design: a print-ready PDF (A4, A5 and A6 layouts and the QR code on its own), a TV slide, a sign image and the QR code as PNG and SVG. The price is {PRICE_LABEL} NZD, paid once. Nothing is posted.</p>
      <h2>Your link and your content</h2>
      <p>You’re responsible for the review link and wording you provide, and for having the right to use the business name. The QR code opens the link you give us. Please check it with the live preview before you pay, and scan your printed sign before you put it up.</p>
      <h2>Changes and refunds</h2>
      <p>You can change the wording, design or link yourself for 7 days after paying, from your download page. If something is wrong that you can’t fix, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we’ll put it right or refund you. Nothing here limits your rights under the Consumer Guarantees Act or Fair Trading Act.</p>
      <h2>Using the files</h2>
      <p>You can print, display and share your files as often as you like for your own business. Please don’t resell the designs.</p>
      <h2>Reviews and Google</h2>
      <p>{PRODUCT} is not affiliated with or endorsed by Google. We don’t control Google’s services, your Business Profile or the reviews people leave. Please follow Google’s rules when asking for reviews: ask everyone, and don’t offer rewards for reviews.</p>
      <h2>Downloads</h2>
      <p>Your download link keeps working for as long as we run the service. We may turn it off if a payment is refunded or disputed. Keep a copy of your files.</p>
    </section>
  );
}
