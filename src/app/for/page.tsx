import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { CtaBand } from '@/components/bits';
import { INDUSTRIES } from '@/lib/industries';
import { getDesign } from '@/lib/designs';
import { pageMeta, JsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMeta(
  '/for',
  'Google Review QR Code Signs for Every Local Business | Review QR NZ',
  'Google review QR code signs for cafés, restaurants, bars, salons, shops, tradies, motels, clinics, gyms and tours. Tips and a design for each.',
);

export default function ForIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Review QR', path: '' }, { name: 'Who it’s for', path: '/for' }])} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>›<span>Who it’s for</span></nav>
          <span className="eyebrow"><Icon name="users" size={16} /> Who it’s for</span>
          <h1>Review QR signs for every local business</h1>
          <p className="lede">Wherever customers have a great experience, a QR code can turn it into a Google review. Pick your kind of business for tips on where to put your sign.</p>
        </div>
      </section>
      <section className="section wrap" style={{ paddingTop: 12 }}>
        <div className="posts three">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/for/${i.slug}`} className="post-card">
              <span className="kicker" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon name={i.icon} size={18} /> Suggested design: {getDesign(i.design).name}</span>
              <h3>{i.name}</h3>
              <p>{i.intro}</p>
              <span className="more">Tips and signs →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
