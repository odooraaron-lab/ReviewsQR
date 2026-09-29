import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getOrderByToken, canEdit, EDIT_DAYS, type Order } from '@/lib/orders';
import { FILES, type FileId } from '@/lib/pack';
import { DESIGNS, getDesign } from '@/lib/designs';
import { Creator } from '@/components/Creator';
import { Icon } from '@/components/Icon';
import { SignageBand } from '@/components/bits';
import { PRICE_LABEL, SUPPORT_EMAIL } from '@/lib/config';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Your review sign', robots: { index: false, follow: false } };

const ICONS: Record<FileId, [string, string]> = {
  pack: ['printer', 'ico-berry'], tv: ['tv', 'ico-sky'], sign: ['phone', 'ico-teal'], 'qr-png': ['qr', 'ico-sun'], 'qr-svg': ['qr', 'ico-sun'],
};

/** A customer's permanent download page (the link in their email). */
export default async function OrderPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ new?: string }> }) {
  const { token } = await params;
  const { new: isNew } = await searchParams;
  const o = await getOrderByToken(token);
  if (!o) notFound();

  if (o.status !== 'paid') {
    return (
      <section className="section narrow center">
        <h1 style={{ fontSize: 'clamp(30px, 6vw, 44px)' }}>{o.status === 'pending' ? 'Waiting for payment' : 'Downloads turned off'}</h1>
        <p className="lede" style={{ margin: '0 auto 20px' }}>
          {o.status === 'pending'
            ? 'We haven’t received the payment for this order yet. If you’ve just paid, give it a minute and refresh.'
            : 'The downloads for this order have been turned off (usually after a refund).'}
        </p>
        <p className="muted">Questions? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </section>
    );
  }

  const d = getDesign(o.design);
  const base = `/api/files/${o.token}`;
  const editable = canEdit(o);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          {isNew && <div className="notice ok">Payment received, thank you! We’ve also emailed everything to <b>{o.email}</b>.</div>}
          <span className="eyebrow"><Icon name="check" size={16} stroke={3} /> Order {o.id}</span>
          <h1>Your review sign for {o.business}</h1>
          <p className="lede">Bookmark this page: your download links keep working, any time. {d.name} design.</p>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        <div className="order-grid">
          <div className="order-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/view-portrait?v=${o.edits}`} alt={`Your ${d.name} Google review sign for ${o.business}`} width={500} height={707} />
            <p className="muted small center" style={{ marginTop: 12 }}>Scan it with your phone to check it opens your review page.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 28 }}>Downloads</h2>
            <ul className="downloads">
              {(Object.keys(FILES) as FileId[]).map((id) => (
                <li key={id}>
                  <a className={`dl${id === 'pack' ? ' main' : ''}`} href={`${base}/${id}?v=${o.edits}`} download>
                    <span className={`ico ${ICONS[id][1]}`}><Icon name={ICONS[id][0]} /></span>
                    <span><b>{FILES[id].label}</b><span>{FILES[id].note}</span></span>
                    <span className="go"><Icon name="download" /></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="feature" style={{ marginBottom: 16 }}>
              <h3>Printing tips</h3>
              <ul className="checks light" style={{ margin: 0 }}>
                <li><Icon name="check" size={18} stroke={3} /><span>Print at <b>100% / actual size</b> on A4. Card stock looks best.</span></li>
                <li><Icon name="check" size={18} stroke={3} /><span>Matte lamination or a clear stand makes it last and avoids glare.</span></li>
                <li><Icon name="check" size={18} stroke={3} /><span>Page 2 has two A5 signs, page 3 has four A6 cards: cut along the dotted lines.</span></li>
              </ul>
              <p className="small" style={{ margin: '12px 0 0' }}><Link href="/blog/printing-your-review-qr-sign">Full printing guide →</Link></p>
            </div>
            <p className="small muted">The code opens: <span style={{ wordBreak: 'break-all' }}>{o.review_url}</span></p>
          </div>
        </div>
      </section>

      <SignageBand design={o.design} compact />

      <section className="section wrap" id="edit">
        <div className="section-head">
          <div>
            <h2>Spotted a typo?</h2>
            <p className="muted">
              {editable
                ? `Change the wording, design or link for free until ${editUntil(o)}. Your downloads update straight away.`
                : `Free changes were available for ${EDIT_DAYS} days after purchase. Email ${SUPPORT_EMAIL} and we’ll help, or make a new sign for ${PRICE_LABEL}.`}
            </p>
          </div>
        </div>
        {editable && (
          <details className="howto" style={{ background: '#fff' }}>
            <summary>Edit my sign</summary>
            <div style={{ padding: '6px 0 16px' }}>
              <Creator
                designs={DESIGNS.map(({ id, name, blurb, bestFor }) => ({ id, name, blurb, bestFor }))}
                price={PRICE_LABEL}
                edit={{ token: o.token, business: o.business, url: o.review_url, design: o.design, headline: o.headline, thanks: o.thanks }}
              />
            </div>
          </details>
        )}
        <p style={{ marginTop: 18 }}><Link className="btn ghost" href="/#create">Make a sign for another business</Link></p>
      </section>
    </>
  );
}

function editUntil(o: Order) {
  const d = new Date(new Date(o.paid_at!).getTime() + EDIT_DAYS * 86400000);
  return d.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Pacific/Auckland' });
}
