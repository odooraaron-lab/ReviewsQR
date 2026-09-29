import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { CtaBand, PostCards } from '@/components/bits';
import { pageMeta, JsonLd, breadcrumbLd, SITE } from '@/lib/seo';
import { POSTS } from '@/lib/blog';

export const metadata = pageMeta(
  '/blog',
  'Google Reviews Guides for NZ Businesses | Review QR',
  'Plain-English guides to getting more Google reviews: finding your review link, where to put a QR code, replying to reviews, Google’s rules and more.',
);

export default function Blog() {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Review QR', path: '' }, { name: 'Guides', path: '/blog' }]),
        { '@context': 'https://schema.org', '@type': 'Blog', name: 'Review QR guides', url: `${SITE}/blog`, inLanguage: 'en-NZ', blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: `${SITE}/blog/${p.slug}`, datePublished: p.date })) },
      ]} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>›<span>Guides</span></nav>
          <span className="eyebrow"><Icon name="chat" size={16} /> Guides</span>
          <h1>Get more Google reviews, the simple way</h1>
          <p className="lede">Plain-English guides for cafés, restaurants and local businesses: where to put your QR code, what to say, how to reply, and what Google allows.</p>
        </div>
      </section>
      <section className="section wrap" style={{ paddingTop: 12 }}>
        <PostCards />
      </section>
      <CtaBand />
    </>
  );
}
