import Link from 'next/link';
import type { Metadata } from 'next';
import { Creator } from '@/components/Creator';
import { Icon } from '@/components/Icon';
import { MobileBuyBar } from '@/components/client-bits';
import { HeroArt, Steps, Gallery, PackArt, PackList, Compare, Spots, SignageBand, Faq, CtaBand, PostCards, PriceCard } from '@/components/bits';
import { DESIGNS } from '@/lib/designs';
import { INDUSTRIES } from '@/lib/industries';
import { PRICE_LABEL } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, productLd, organizationLd, websiteLd, howToLd } from '@/lib/seo';

export const metadata: Metadata = pageMeta(
  '',
  `Google Review QR Code Sign NZ | Print-Ready PDF, ${PRICE_LABEL} | Review QR`,
  `Get more Google reviews with a print-ready QR code sign. Pick one of six designs, pay ${PRICE_LABEL} NZD, download a PDF + TV slide in a minute. No sign-up.`,
);

const FAQ: [string, string][] = [
  ['How do I find my Google review link?', 'Sign in to the Google account that manages your business, search Google for your business name, and tap “Ask for reviews” (or “Get more reviews”) in your profile tools. Copy the link, which usually looks like g.page/r/…/review. Our step-by-step guide shows other ways too.'],
  ['What do I get for $5.99?', 'A print-ready PDF with an A4 poster, two A5 table signs and four A6 counter cards, the QR code on its own for your own designs, a 1920 × 1080 TV slide, a high-res sign image and the QR code as PNG and SVG. You can download them straight away and we email you a copy.'],
  ['Do I need to sign up or subscribe?', 'No. There’s no account and no subscription. You pay once and keep your files forever.'],
  ['Will the QR code ever stop working?', 'No. It’s a static QR code: it opens your Google review form directly, with no redirect through us. It works for as long as your Google Business Profile does.'],
  ['Can I test my link before I pay?', 'Yes. Tap “Test my link” on the order form and it opens exactly the page your QR code will open. The preview shows a sample code; your own code is on your download.'],
  ['What if I make a typo?', 'You can change the wording, design or link yourself for 7 days after you pay, from your download page. Free.'],
  ['How do I print it?', 'Print the PDF at 100% (actual size) on A4 paper or card, at home or at any print shop. Matte lamination or a clear acrylic stand makes it last.'],
  ['Can I show it on a TV?', 'Yes. Every pack includes a 1920 × 1080 TV slide. It’s made to work with myQR Digital Signage, and any screen that shows images.'],
  ['Can I offer a discount for reviews?', 'No. Google doesn’t allow rewards for reviews. Our signs simply invite every customer to leave an honest review, which is what Google’s rules expect.'],
  ['Is this made by Google?', 'No. Review QR is made by myQR, a New Zealand business. We’re not affiliated with Google. The code simply opens your own Google review form.'],
  ['How do I pay?', 'Securely through Stripe with a card, Apple Pay or Google Pay. Prices are in NZD.'],
];

export default function Home() {
  const designs = DESIGNS.map(({ id, name, blurb, bestFor }) => ({ id, name, blurb, bestFor }));
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), productLd(), howToLd(), faqLd(FAQ)]} />

      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <span className="eyebrow"><Icon name="star" size={16} fill /> Google review QR code signs · NZ</span>
            <h1>Get more Google reviews with a <span className="hl">QR code sign</span></h1>
            <p className="lede">Paste your Google review link, pick a design and download a print-ready sign with your own QR code. Customers scan, tap the stars, done.</p>
            <div className="row">
              <Link className="btn big" href="#create">Create my sign · {PRICE_LABEL}</Link>
              <Link className="btn big ghost" href="#designs">See the designs</Link>
            </div>
            <ul className="promise">
              <li><Icon name="check" size={18} stroke={3} />No sign-up, no subscription</li>
              <li><Icon name="check" size={18} stroke={3} />Print-ready PDF + TV slide</li>
              <li><Icon name="check" size={18} stroke={3} />In your inbox in a minute</li>
              <li><Icon name="check" size={18} stroke={3} />QR code never expires</li>
            </ul>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="section wrap" id="how">
        <div className="section-head">
          <div>
            <h2>Cheap, easy, done in two minutes</h2>
            <p className="muted">No account to create, no app to install, no monthly fee. Just your sign, ready to print.</p>
          </div>
        </div>
        <Steps />
      </section>

      <section className="creator-wrap section" id="create">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow"><Icon name="sparkle" size={16} /> Live preview</span>
              <h2>Create your review sign</h2>
              <p className="muted">Type your details and watch the sign change. Tap “Test my link” to check your review link before you pay.</p>
            </div>
          </div>
          <Creator designs={designs} price={PRICE_LABEL} placesEnabled={!!process.env.GOOGLE_PLACES_API_KEY} />
        </div>
      </section>

      <section className="section wrap" id="designs">
        <div className="section-head">
          <div>
            <h2>Six designs, made to be noticed</h2>
            <p className="muted">Every design is drawn fresh with your business name and wording, and prints sharp at any size.</p>
          </div>
        </div>
        <Gallery />
      </section>

      <section className="section wrap" id="pack">
        <div className="pack">
          <PackArt />
          <div>
            <span className="eyebrow"><Icon name="download" size={16} /> What you get</span>
            <h2>A whole pack, not just a QR code</h2>
            <p className="muted">One {PRICE_LABEL} order gives you every size you need, ready to print at home or at any print shop.</p>
            <PackList />
          </div>
        </div>
      </section>

      <section className="section wrap" id="why">
        <div className="section-head">
          <div>
            <span className="eyebrow"><Icon name="trend" size={16} /> Why it works</span>
            <h2>A direct link to your review page is everything</h2>
            <p className="muted">Happy customers mean to leave a review, but “find us on Google” asks them to do the work. A QR code takes them straight to the stars.</p>
          </div>
        </div>
        <Compare />
        <div className="features four" style={{ marginTop: 18 }}>
          <div className="feature"><div className="ico ico-berry"><Icon name="search" /></div><h3>Get found</h3><p>Google says positive reviews can improve your visibility in local search and on Maps.</p></div>
          <div className="feature"><div className="ico ico-teal"><Icon name="users" /></div><h3>Win new customers</h3><p>People compare star ratings and review counts before choosing where to go.</p></div>
          <div className="feature"><div className="ico ico-sun"><Icon name="heart" /></div><h3>Build loyalty</h3><p>Asking for feedback, and replying to it, turns happy customers into regulars.</p></div>
          <div className="feature"><div className="ico ico-sky"><Icon name="chat" /></div><h3>Learn what works</h3><p>Reviews tell you what to keep doing and what to fix, for free.</p></div>
        </div>
        <p className="small" style={{ marginTop: 16 }}><Link href="/blog/google-reviews-build-customer-loyalty">Why reviews build loyalty →</Link> · <Link href="/blog/direct-review-link-vs-find-us-on-google">Why a direct link matters →</Link></p>
      </section>

      <section className="section wrap" id="where">
        <div className="section-head">
          <div>
            <h2>Put it where people pause</h2>
            <p className="muted">The best spots are where customers already have their phone in hand, right after a good experience.</p>
          </div>
          <Link href="/blog/where-to-put-your-review-qr-code" className="small">12 spots that work →</Link>
        </div>
        <Spots />
      </section>

      <SignageBand />

      <section className="section wrap" id="for">
        <div className="section-head">
          <div>
            <h2>Made for local businesses</h2>
            <p className="muted">Cafés, restaurants, salons, tradies, motels and more. Tips for your kind of business:</p>
          </div>
          <Link href="/for" className="small">All businesses →</Link>
        </div>
        <div className="chips">
          {INDUSTRIES.map((i) => <Link key={i.slug} href={`/for/${i.slug}`} className="chip"><Icon name={i.icon} size={18} />{i.name}</Link>)}
        </div>
      </section>

      <section className="section wrap" id="pricing">
        <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <h2>One small price. That’s it.</h2>
            <p className="muted">Many “free” QR generators make codes that stop working unless you subscribe. Ours link straight to Google, forever.</p>
          </div>
        </div>
        <PriceCard />
      </section>

      <section className="section wrap" id="questions">
        <div className="section-head"><h2>Questions</h2></div>
        <Faq items={FAQ} />
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Guides for getting more reviews</h2>
          <Link href="/blog" className="small">All guides →</Link>
        </div>
        <PostCards slugs={['how-to-find-your-google-review-link', 'google-reviews-for-cafes', 'google-reviews-build-customer-loyalty']} />
      </section>

      <CtaBand />
      <MobileBuyBar title={PRICE_LABEL} note="Print-ready review sign · no sign-up" />
    </>
  );
}
