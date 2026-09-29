import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { MobileBuyBar } from '@/components/client-bits';
import { Rich, Compare, TvMock, SignageBand, Faq, CtaBand, PostCards } from '@/components/bits';
import { POSTS, getPost, type Section } from '@/lib/blog';
import { INDUSTRIES } from '@/lib/industries';
import { PRICE_LABEL, BRAND } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, SITE } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? pageMeta(`/blog/${p.slug}`, p.title, p.description, { openGraph: { type: 'article', title: p.title, description: p.description, url: `/blog/${p.slug}`, publishedTime: p.date, images: ['/opengraph-image'] } }) : {};
}

function Figure({ kind }: { kind: NonNullable<Section['figure']> }) {
  if (kind === 'compare') return <figure><Compare /></figure>;
  if (kind === 'tv') return <figure><TvMock design="midnight" /><figcaption>The TV slide from a Review QR pack, on a venue screen.</figcaption></figure>;
  return (
    <figure>
      <div className="designs-pick" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {/* eslint-disable @next/next/no-img-element */}
        {['cafe', 'midnight', 'fern'].map((d) => <img key={d} src={`/examples/${d}.svg`} alt={`Example ${d} review QR sign`} loading="lazy" style={{ borderRadius: 12, width: '100%', boxShadow: '0 10px 24px -14px rgba(46,33,64,.5)' }} />)}
        {/* eslint-enable @next/next/no-img-element */}
      </div>
      <figcaption>Example signs. Yours has your business name, wording and your own QR code.</figcaption>
    </figure>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const article = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.h1, description: p.description,
    datePublished: p.date, dateModified: p.date, inLanguage: 'en-NZ', image: `${SITE}/opengraph-image`,
    author: { '@type': 'Organization', name: BRAND, url: SITE }, publisher: { '@type': 'Organization', name: BRAND, logo: { '@type': 'ImageObject', url: `${SITE}/icon1.png` } },
    mainEntityOfPage: `${SITE}/blog/${p.slug}`,
  };
  const date = new Date(p.date).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <JsonLd data={[article, faqLd(p.faq), breadcrumbLd([{ name: 'Review QR', path: '' }, { name: 'Guides', path: '/blog' }, { name: p.nav, path: `/blog/${p.slug}` }])]} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>›<Link href="/blog">Guides</Link>›<span>{p.nav}</span></nav>
          <span className="eyebrow">{p.kicker}</span>
          <h1>{p.h1}</h1>
          <p className="lede">{p.intro}</p>
          <p className="byline">By the {BRAND} team · {date} · {p.mins} min read</p>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 16 }}>
        <div className="article">
          <article className="prose">
            {p.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body?.map((t) => <p key={t}><Rich text={t} /></p>)}
                {s.steps && <ol>{s.steps.map((t) => <li key={t}><Rich text={t} /></li>)}</ol>}
                {s.list && <ul>{s.list.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>}
                {s.quote && <blockquote>{s.quote}</blockquote>}
                {s.callout && <div className="callout"><p><Rich text={s.callout} /></p></div>}
                {s.figure && <Figure kind={s.figure} />}
              </section>
            ))}
          </article>
          <aside>
            <div className="side-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/examples/cafe.svg" alt="Example Google review QR code sign" loading="lazy" width={220} height={311} />
              <h3>Make your review sign</h3>
              <p>Paste your Google review link, pick a design, download a print-ready PDF. No sign-up.</p>
              <Link className="btn" href="/#create">Create my sign · {PRICE_LABEL}</Link>
            </div>
          </aside>
        </div>
      </section>

      {p.tv && <SignageBand compact />}

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions</h2></div>
        <Faq items={p.faq} />
      </section>

      <section className="section wrap">
        <div className="section-head"><h2>Read next</h2></div>
        <PostCards slugs={p.related} />
        <div className="chips" style={{ marginTop: 20 }}>
          {INDUSTRIES.slice(0, 6).map((i) => <Link key={i.slug} href={`/for/${i.slug}`} className="chip"><Icon name={i.icon} size={18} />{i.name}</Link>)}
        </div>
      </section>

      <CtaBand />
      <MobileBuyBar title={PRICE_LABEL} note="Print-ready review sign · no sign-up" />
    </>
  );
}
