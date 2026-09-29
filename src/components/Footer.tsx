import Link from 'next/link';
import { Logo } from './Logo';
import { MyqrFamily } from './MyqrFamily';
import { INDUSTRIES } from '@/lib/industries';
import { POSTS } from '@/lib/blog';
import { BRAND, PRODUCT, SUPPORT_EMAIL, SIGNAGE_URL } from '@/lib/config';

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <Link href="/" className="logo"><Logo product={PRODUCT} brand={BRAND} /></Link>
          <p>Print-ready Google review QR code signs for New Zealand businesses. No sign-up, no subscription: pay once, print, and start collecting reviews.</p>
        </div>
        <nav aria-label="Review QR">
          <h4>{PRODUCT}</h4>
          <Link href="/#create">Create my sign</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#designs">Designs</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#questions">FAQ</Link>
        </nav>
        <nav aria-label="Who it’s for">
          <h4>Who it’s for</h4>
          {INDUSTRIES.slice(0, 7).map((i) => <Link key={i.slug} href={`/for/${i.slug}`}>{i.name}</Link>)}
          <Link href="/for">All businesses →</Link>
        </nav>
        <nav aria-label="Guides">
          <h4>Guides</h4>
          {POSTS.slice(0, 6).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`}>{p.nav}</Link>)}
          <Link href="/blog">All guides →</Link>
        </nav>
        <nav aria-label="Help">
          <h4>Help</h4>
          <a href={`mailto:${SUPPORT_EMAIL}`}>Contact us</a>
          <a href={SIGNAGE_URL}>Show it on your TVs</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <MyqrFamily current="reviews" />
        <div className="fine">
          <p>{PRODUCT} is made by {BRAND} in Aotearoa New Zealand. Prices in NZD.</p>
          <p>Not affiliated with or endorsed by Google. Google and Google Business Profile are trademarks of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
}
