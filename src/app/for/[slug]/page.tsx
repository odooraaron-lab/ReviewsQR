import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Creator } from '@/components/Creator';
import { Icon } from '@/components/Icon';
import { MobileBuyBar } from '@/components/client-bits';
import { HeroArt, Steps, PackList, SignageBand, Faq, CtaBand, PostCards, Gallery } from '@/components/bits';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { DESIGNS, getDesign } from '@/lib/designs';
import { EXAMPLES } from '@/lib/examples';
import { PRICE_LABEL } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, productLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  return i ? pageMeta(`/for/${i.slug}`, i.title, i.description) : {};
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const d = getDesign(i.design);
  const designs = DESIGNS.map(({ id, name, blurb, bestFor }) => ({ id, name, blurb, bestFor }));
  return (
    <>
      <JsonLd data={[productLd(`/for/${i.slug}`), faqLd(i.faq), breadcrumbLd([{ name: 'Review QR', path: '' }, { name: 'Who it’s for', path: '/for' }, { name: i.name, path: `/for/${i.slug}` }])]} />
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>›<Link href="/for">Who it’s for</Link>›<span>{i.name}</span></nav>
            <span className="eyebrow"><Icon name={i.icon} size={16} /> For {i.name.toLowerCase()}</span>
            <h1>{i.h1}</h1>
            <p className="lede">{i.intro}</p>
            <div className="row">
              <Link className="btn big" href="#create">Create my sign · {PRICE_LABEL}</Link>
            </div>
            <ul className="promise">
              <li><Icon name="check" size={18} stroke={3} />No sign-up</li>
              <li><Icon name="check" size={18} stroke={3} />Print-ready in a minute</li>
              <li><Icon name="check" size={18} stroke={3} />A4, A5, A6 + TV slide</li>
              <li><Icon name="check" size={18} stroke={3} />Never expires</li>
            </ul>
          </div>
          <HeroArt design={i.design} business={EXAMPLES[i.design].business} />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head"><div><h2>Where to put it</h2><p className="muted">The best spots for {i.name.toLowerCase()}, where customers pause with their phone in hand.</p></div></div>
        <div className="features four">
          {i.spots.map((s, n) => (
            <div key={s.t} className="feature">
              <div className={`ico ${['ico-berry', 'ico-teal', 'ico-sun', 'ico-sky'][n % 4]}`}><Icon name={s.icon} /></div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="creator-wrap section" id="create">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow"><Icon name="sparkle" size={16} /> Starts with {d.name}</span>
              <h2>Create your sign</h2>
              <p className="muted">We’ve started you on the {d.name} design and “{i.headline}”. Change anything you like.</p>
            </div>
          </div>
          <Creator designs={designs} price={PRICE_LABEL} initialDesign={i.design} initialHeadline={i.headline} placesEnabled={!!process.env.GOOGLE_PLACES_API_KEY} />
        </div>
      </section>

      <section className="section wrap">
        <div className="split" style={{ alignItems: 'start' }}>
          <div>
            <h2>Tips for {i.name.toLowerCase()}</h2>
            <ul className="checks light">
              {i.tips.map((t) => <li key={t}><Icon name="check" size={18} stroke={3} /><span>{t}</span></li>)}
            </ul>
            <p className="small"><Link href="/blog/google-review-rules-nz">What’s allowed when asking for reviews →</Link></p>
          </div>
          <div className="feature">
            <h3>What’s in your {PRICE_LABEL} pack</h3>
            <PackList />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head"><h2>How it works</h2></div>
        <Steps />
      </section>

      <SignageBand design={i.design} />

      <section className="section wrap">
        <div className="section-head"><h2>All six designs</h2></div>
        <Gallery />
      </section>

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions from {i.name.toLowerCase()}</h2></div>
        <Faq items={i.faq} />
      </section>

      <section className="section wrap">
        <div className="section-head"><h2>Guides</h2><Link href="/blog" className="small">All guides →</Link></div>
        <PostCards slugs={i.posts} />
      </section>

      <section className="section wrap">
        <div className="section-head"><h2>Other businesses</h2></div>
        <div className="chips">
          {INDUSTRIES.filter((x) => x.slug !== i.slug).map((x) => <Link key={x.slug} href={`/for/${x.slug}`} className="chip"><Icon name={x.icon} size={18} />{x.name}</Link>)}
        </div>
      </section>

      <CtaBand />
      <MobileBuyBar title={PRICE_LABEL} note={`Review sign for ${i.name.toLowerCase()}`} href="#create" />
    </>
  );
}
