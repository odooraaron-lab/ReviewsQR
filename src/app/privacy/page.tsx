import { pageMeta } from '@/lib/seo';
import { BRAND, PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export const metadata = pageMeta('/privacy', `Privacy | ${PRODUCT} by ${BRAND}`, `How ${PRODUCT} handles your information: what we collect to make and send your sign, and nothing more.`);

export default function Privacy() {
  return (
    <section className="section narrow legal">
      <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)' }}>Privacy</h1>
      <p className="muted">Last updated 29 September 2026</p>
      <p>{PRODUCT} is run by {BRAND}, a New Zealand business. We follow the Privacy Act 2020 and collect only what we need to make and deliver your sign.</p>
      <h2>What we collect</h2>
      <ul>
        <li><b>Your order details:</b> business name, sign wording, design and review link, so we can draw your sign and let you download it again.</li>
        <li><b>Your email address:</b> to send your files and a receipt. We don’t add you to a mailing list.</li>
        <li><b>Payment:</b> handled by Stripe. We never see or store your card number.</li>
        <li><b>Basic visit statistics:</b> pages viewed and the kind of device, without names, to see which pages help people.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>Only the services that run the site: Stripe (payments), Resend (email), Vercel (hosting) and Neon (database). Some of them store data outside New Zealand. We don’t sell your information.</p>
      <h2>How long we keep it</h2>
      <p>Paid orders are kept so your download link keeps working. Unpaid checkouts are deleted after three days. Ask us to delete your order at any time.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete your information by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      <h2>Your customers</h2>
      <p>When customers scan your sign, their phone opens Google directly. The code doesn’t pass through us, so we never see who scans it.</p>
    </section>
  );
}
