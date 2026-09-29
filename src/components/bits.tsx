import Link from 'next/link';
import { Icon, Stars } from './Icon';
import { UseDesign } from './client-bits';
import { DESIGNS } from '@/lib/designs';
import { POSTS, type Post } from '@/lib/blog';
import { PRICE_LABEL, SIGNAGE_URL } from '@/lib/config';

// Server-rendered pieces shared by the home page, industry pages and blog posts.

/** **bold** and [links](/path) inside content strings. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const b = p.match(/^\*\*([^*]+)\*\*$/);
        if (b) return <b key={i}>{b[1]}</b>;
        const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (l) return l[2].startsWith('/') ? <Link key={i} href={l[2]}>{l[1]}</Link> : <a key={i} href={l[2]}>{l[1]}</a>;
        return p;
      })}
    </>
  );
}

/** Hero: a table sign in a stand, a phone on the review form and a new-review toast. */
export function HeroArt({ design = 'cafe', business = 'Harbour Street Café' }: { design?: string; business?: string }) {
  return (
    <div className="stage" role="img" aria-label="A Google review QR code sign on a café table, with a phone showing the review form and five stars">
      <div className="table" />
      <div className="standee">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/examples/${design}.svg`} alt="" width={260} height={368} fetchPriority="high" />
      </div>
      <div className="scan-line" />
      <div className="phone">
        <div className="phone-screen">
          <div className="phone-top"><div className="pl">{business.charAt(0)}</div><b>{business}</b><span>Rate your experience</span></div>
          <div className="phone-body">
            <div className="q">How was your visit?</div>
            <div className="phone-stars"><Stars size={20} /></div>
            <div className="box">Best flat white in town and such friendly staff!</div>
            <div className="post">Post</div>
          </div>
        </div>
      </div>
      <div className="toast"><span className="ico"><Icon name="star" size={20} fill className="" /></span><span>New 5-star review<small>just now</small></span></div>
    </div>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      <li><span className="ico ico-berry"><Icon name="link" size={26} /></span><h3>Paste your review link</h3><p>Copy it from your Google Business Profile. We show you where.</p></li>
      <li><span className="ico ico-teal"><Icon name="palette" size={26} /></span><h3>Pick a design</h3><p>Six looks, your business name and wording. Watch the preview update as you type.</p></li>
      <li><span className="ico ico-sun"><Icon name="download" size={26} /></span><h3>Pay {PRICE_LABEL}, print</h3><p>Download straight away, plus a copy by email. No sign-up, no subscription.</p></li>
    </ol>
  );
}

export function Gallery() {
  return (
    <div className="gallery">
      {DESIGNS.map((d) => (
        <div key={d.id} className="g-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/examples/${d.id}.svg`} alt={`${d.name} Google review QR code sign design`} loading="lazy" width={340} height={481} />
          <div className="g-body">
            <h3>{d.name}</h3>
            <p>{d.blurb}</p>
            <div className="for">{d.bestFor}</div>
            <UseDesign id={d.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PackArt({ design = 'midnight' }: { design?: string }) {
  const src = `/examples/${design}.svg`;
  return (
    <div className="pack-art" role="img" aria-label="The print pack: an A4 poster, two A5 table signs, four A6 counter cards and a TV slide">
      {/* eslint-disable @next/next/no-img-element */}
      <div className="sheet a4"><img src={src} alt="" loading="lazy" /></div>
      <div className="sheet a5"><img src={src} alt="" loading="lazy" /><img src={src} alt="" loading="lazy" /></div>
      <div className="sheet a6"><img src={src} alt="" loading="lazy" /><img src={src} alt="" loading="lazy" /><img src={src} alt="" loading="lazy" /><img src={src} alt="" loading="lazy" /></div>
      <div className="tv"><img src={`/examples/${design}-tv.svg`} alt="" loading="lazy" /></div>
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}

export function PackList() {
  const items = [
    { icon: 'printer', c: 'ico-berry', t: 'A4 poster', d: 'For windows, walls and noticeboards.' },
    { icon: 'table', c: 'ico-teal', t: '2 × A5 table signs', d: 'Two on one A4 page, for counters and tables.' },
    { icon: 'card', c: 'ico-sun', t: '4 × A6 counter cards', d: 'Four per page: bill folders, rooms, bags.' },
    { icon: 'tv', c: 'ico-sky', t: 'TV slide (1920 × 1080)', d: 'For your screens and digital signage.' },
    { icon: 'qr', c: 'ico-berry', t: 'QR code on its own', d: 'PNG and SVG, for menus, invoices and your own designs.' },
    { icon: 'phone', c: 'ico-teal', t: 'Sign image (PNG)', d: 'For Instagram, Facebook, emails and your website.' },
  ];
  return (
    <ul className="pack-list">
      {items.map((i) => <li key={i.t}><span className={`ico ${i.c}`}><Icon name={i.icon} /></span><div><b>{i.t}</b><span>{i.d}</span></div></li>)}
    </ul>
  );
}

export function Compare() {
  return (
    <div className="compare">
      <div className="bad-way">
        <span className="tag">“Find us on Google”</span>
        <h3>Six steps, and most people give up</h3>
        <ol>
          <li>Open Google</li>
          <li>Type your business name</li>
          <li>Pick the right listing</li>
          <li>Scroll to the reviews</li>
          <li>Find “Write a review”</li>
          <li>Tap the stars</li>
        </ol>
      </div>
      <div className="good-way">
        <span className="tag">Your review QR code</span>
        <h3>Two steps, while they’re still smiling</h3>
        <ol>
          <li>Point the phone camera at the code</li>
          <li>Tap the stars and write a line</li>
        </ol>
        <p className="small" style={{ margin: '12px 0 0' }}>The code opens your Google review form directly, with the stars ready to tap.</p>
      </div>
    </div>
  );
}

export function Spots() {
  const spots = [
    { icon: 'card', c: 'ico-berry', t: 'Counter & till', d: 'Everyone passes it, phone in hand' },
    { icon: 'table', c: 'ico-teal', t: 'Tables', d: 'A6 cards in small stands' },
    { icon: 'receipt', c: 'ico-sun', t: 'Bill folders', d: 'Right after a great meal' },
    { icon: 'window', c: 'ico-sky', t: 'Front window', d: 'The A4 poster at eye level' },
    { icon: 'tv', c: 'ico-berry', t: 'TV screens', d: 'The TV slide, between specials' },
    { icon: 'bag', c: 'ico-teal', t: 'Bags & takeaways', d: 'A card goes home with them' },
    { icon: 'menu', c: 'ico-sun', t: 'Menus & invoices', d: 'Add the QR code image' },
    { icon: 'mail', c: 'ico-sky', t: 'Emails', d: 'In your signature or follow-ups' },
  ];
  return (
    <div className="spots">
      {spots.map((s) => <div key={s.t} className="spot"><span className={`ico ${s.c}`}><Icon name={s.icon} size={22} /></span><div><b>{s.t}</b><span>{s.d}</span></div></div>)}
    </div>
  );
}

export function TvMock({ design = 'chalk' }: { design?: string }) {
  return (
    <div className="tv-mock">
      <div className="bezel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/examples/${design}-tv.svg`} alt="A Google review QR code slide showing on a venue TV" loading="lazy" width={960} height={540} />
      </div>
      <span className="live">On screen now</span>
    </div>
  );
}

/** The cross-sell for myQR Digital Signage. */
export function SignageBand({ design = 'chalk', compact = false }: { design?: string; compact?: boolean }) {
  return (
    <section className="dark-band" id="tv">
      <div className="wrap split">
        <div>
          <span className="eyebrow"><Icon name="tv" size={16} /> Included: a TV slide</span>
          <h2>Put your review QR code on every TV</h2>
          <p>Screens are the biggest sign in the room. Every pack includes a 1920 × 1080 slide made for TVs, so customers can scan from their seat.</p>
          {!compact && (
            <ul className="checks">
              <li><Icon name="check" size={18} stroke={3} /><span>Show it between your specials, the sport or the menu.</span></li>
              <li><Icon name="check" size={18} stroke={3} /><span>With <b>myQR Digital Signage</b> it runs in the TV’s web browser: no app, no player box, updated from your phone.</span></li>
              <li><Icon name="check" size={18} stroke={3} /><span>Schedule it for the right moments, like after the lunch rush or at half-time.</span></li>
            </ul>
          )}
          <div className="row">
            <a className="btn sun" href={SIGNAGE_URL}>See Digital Signage</a>
            <Link className="btn ghost" href="/blog/review-qr-code-on-tv-digital-signage">TV tips</Link>
          </div>
        </div>
        <TvMock design={design} />
      </div>
    </section>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </div>
  );
}

export function CtaBand({ title = 'Start collecting reviews today', text = `One sign, ${PRICE_LABEL}, ready to print in two minutes.` }: { title?: string; text?: string }) {
  return (
    <section className="section wrap">
      <div className="cta-band">
        <div><h2>{title}</h2><p>{text}</p></div>
        <Link className="btn sun big" href="/#create">Create my sign</Link>
      </div>
    </section>
  );
}

export function PostCards({ slugs, three = true }: { slugs?: string[]; three?: boolean }) {
  const list: Post[] = slugs ? slugs.map((s) => POSTS.find((p) => p.slug === s)).filter((p): p is Post => !!p) : POSTS;
  return (
    <div className={`posts${three ? ' three' : ''}`}>
      {list.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
          <span className="kicker">{p.kicker} · {p.mins} min read</span>
          <h3>{p.h1}</h3>
          <p>{p.description}</p>
          <span className="more">Read the guide →</span>
        </Link>
      ))}
    </div>
  );
}

export function PriceCard() {
  return (
    <div className="price-card">
      <span className="tag">No sign-up · No subscription</span>
      <h3>Everything for one sign</h3>
      <div className="amount">{PRICE_LABEL} <small>NZD</small></div>
      <p className="muted small" style={{ margin: 0 }}>Pay once. Keep it forever.</p>
      <ul>
        <li><Icon name="check" size={18} stroke={3} />Print-ready PDF: A4 poster, 2 × A5, 4 × A6</li>
        <li><Icon name="check" size={18} stroke={3} />TV slide, sign image and QR code files</li>
        <li><Icon name="check" size={18} stroke={3} />Static QR code: never expires, no middleman</li>
        <li><Icon name="check" size={18} stroke={3} />Free changes for 7 days if you spot a typo</li>
        <li><Icon name="check" size={18} stroke={3} />Emailed in about a minute, re-download any time</li>
      </ul>
      <Link className="btn big block" href="/#create">Create my sign</Link>
    </div>
  );
}
