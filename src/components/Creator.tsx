'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HEADLINES, THANKS, LIMITS, normaliseUrl, looksLikeGoogle } from '@/lib/options';
import { Icon } from './Icon';

type DesignInfo = { id: string; name: string; blurb: string; bestFor: string };

type Props = {
  designs: DesignInfo[];
  price: string;
  placesEnabled?: boolean;
  initialDesign?: string;
  initialHeadline?: string;
  /** Edit mode: changes a paid order instead of starting a new one. */
  edit?: { token: string; business: string; url: string; design: string; headline: string; thanks: string };
};

const CUSTOM = '__custom';
const DRAFT_KEY = 'rq-draft-v1';

export function Creator({ designs, price, placesEnabled, initialDesign, initialHeadline, edit }: Props) {
  const startHeadline = edit?.headline ?? initialHeadline ?? HEADLINES[0];
  const [business, setBusiness] = useState(edit?.business ?? '');
  const [url, setUrl] = useState(edit?.url ?? '');
  const [design, setDesign] = useState(edit?.design ?? initialDesign ?? designs[0].id);
  const [headlineChoice, setHeadlineChoice] = useState(HEADLINES.includes(startHeadline) ? startHeadline : CUSTOM);
  const [customHeadline, setCustomHeadline] = useState(HEADLINES.includes(startHeadline) ? '' : startHeadline);
  const [thanks, setThanks] = useState(edit?.thanks ?? THANKS[0]);
  const [email, setEmail] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [bad, setBad] = useState<string | null>(null);
  const [touchedUrl, setTouchedUrl] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const headline = headlineChoice === CUSTOM ? customHeadline : headlineChoice;
  const cleanUrl = useMemo(() => normaliseUrl(url), [url]);
  const designInfo = designs.find((d) => d.id === design) ?? designs[0];

  // Bring back a draft (e.g. after cancelling at checkout), and honour ?design= links.
  useEffect(() => {
    if (edit) return;
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (d) {
        if (d.business) setBusiness(d.business);
        if (d.url) setUrl(d.url);
        if (d.email) setEmail(d.email);
        if (d.design && !initialDesign) setDesign(d.design);
      }
    } catch { /* storage unavailable */ }
    const q = new URLSearchParams(window.location.search).get('design');
    if (q && designs.some((x) => x.id === q)) setDesign(q);
    const pick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (designs.some((x) => x.id === id)) setDesign(id);
    };
    window.addEventListener('rq:design', pick);
    return () => window.removeEventListener('rq:design', pick);
  }, [designs, edit, initialDesign]);

  useEffect(() => {
    if (edit) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ business, url, email, design })); } catch { /* ignore */ }
  }, [business, url, email, design, edit]);

  // The live preview, redrawn a moment after typing stops.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const q = new URLSearchParams({ b: business, h: headline, t: thanks, u: cleanUrl || '', d: design, o: orientation });
      setSrc(`/api/preview?${q}`);
    }, 320);
    return () => clearTimeout(t);
  }, [business, headline, thanks, cleanUrl, design, orientation]);

  const urlStatus = !url.trim() ? null
    : !cleanUrl ? { cls: 'bad', text: 'That doesn’t look like a web address yet.' }
    : looksLikeGoogle(cleanUrl) ? { cls: 'ok', text: 'Looks like a Google link. Scan the preview to check it opens your review page.' }
    : { cls: 'warn', text: 'This isn’t a Google link. That’s fine if it’s where you want reviews (e.g. TripAdvisor).' };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setBad(null);
    if (!business.trim()) return fail('Please add your business name.', 'business');
    if (!cleanUrl) return fail('Please paste your Google review link.', 'url');
    if (headlineChoice === CUSTOM && !customHeadline.trim()) return fail('Please write your headline, or pick one from the list.', 'headline');
    if (!edit && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return fail('Please check your email address. We send your sign there.', 'email');
    setBusy(true);
    const hp = (formRef.current?.elements.namedItem('company') as HTMLInputElement | null)?.value;
    const body = { business, url: cleanUrl, design, headline, thanks, email, company: hp };
    try {
      const res = await fetch(edit ? `/api/orders/${edit.token}` : '/api/checkout', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setBusy(false); return fail(data.error || 'Something went wrong. Please try again.', data.field); }
      if (edit) { window.location.reload(); return; }
      window.location.href = data.url;
    } catch {
      setBusy(false);
      fail('Couldn’t reach us. Check your connection and try again.');
    }
  }

  function fail(msg: string, field?: string) {
    setError(msg);
    setBad(field ?? null);
    const el = field ? document.getElementById(`f-${field}`) : null;
    el?.focus();
  }

  return (
    <form ref={formRef} className="creator" onSubmit={submit} noValidate>
      <fieldset className="panel g-a">
        <legend><span className="num">1</span> Your business</legend>
        <div className="field">
          <div className="label-row"><label htmlFor="f-business">Business name</label><span className="count">{business.length}/{LIMITS.business}</span></div>
          <input id="f-business" type="text" autoComplete="organization" maxLength={LIMITS.business} placeholder="e.g. Harbour Street Café" value={business} onChange={(e) => setBusiness(e.target.value)} aria-invalid={bad === 'business'} />
        </div>
        {placesEnabled && <Finder onPick={(name, link) => { setUrl(link); setTouchedUrl(true); if (!business.trim()) setBusiness(name.slice(0, LIMITS.business)); }} />}
        <div className="field">
          <label htmlFor="f-url">Your Google review link</label>
          <input id="f-url" type="url" inputMode="url" autoComplete="url" autoCapitalize="off" spellCheck={false} placeholder="https://g.page/r/…/review" value={url} onChange={(e) => setUrl(e.target.value)} onBlur={() => setTouchedUrl(true)} aria-invalid={bad === 'url' || (touchedUrl && urlStatus?.cls === 'bad')} aria-describedby="url-status" />
          <div id="url-status" aria-live="polite">
            {urlStatus && (touchedUrl || urlStatus.cls !== 'bad') && (
              <span className={`status ${urlStatus.cls}`}><Icon name={urlStatus.cls === 'ok' ? 'check' : 'bolt'} size={16} />{urlStatus.text}</span>
            )}
          </div>
          <details className="howto">
            <summary>How do I find my review link?</summary>
            <ol>
              <li>Sign in to the Google account that manages your business.</li>
              <li>Search Google for your business name. Your profile tools appear at the top.</li>
              <li>Tap <b>Ask for reviews</b> (or <b>Get more reviews</b>) and copy the link.</li>
              <li>Paste it above. It usually looks like <b>g.page/r/…/review</b>.</li>
            </ol>
            <p className="small"><a href="/blog/how-to-find-your-google-review-link" target="_blank">Step-by-step guide with other ways →</a></p>
          </details>
        </div>
      </fieldset>

      <fieldset className="panel g-b">
        <legend><span className="num">2</span> Pick a design</legend>
        <div className="designs-pick" role="radiogroup" aria-label="Design">
          {designs.map((d) => (
            <label key={d.id} className="dp">
              <input type="radio" name="design" value={d.id} checked={design === d.id} onChange={() => setDesign(d.id)} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/examples/${d.id}.svg`} alt="" loading="lazy" width={120} height={170} />
              <span>{d.name}</span>
              <i className="tick"><Icon name="check" size={14} stroke={3} /></i>
            </label>
          ))}
        </div>
        <p className="design-note"><b>{designInfo.name}:</b> {designInfo.blurb} <span className="muted">Great for {designInfo.bestFor.toLowerCase()}.</span></p>
      </fieldset>

      <div className="preview g-p" aria-label="Live preview">
        <div className="preview-top">
          <b>Live preview</b>
          <div className="seg" role="group" aria-label="Preview size">
            <button type="button" aria-pressed={orientation === 'portrait'} onClick={() => setOrientation('portrait')}>Printed sign</button>
            <button type="button" aria-pressed={orientation === 'landscape'} onClick={() => setOrientation('landscape')}>TV slide</button>
          </div>
        </div>
        <div className={`preview-frame ${orientation}${loading ? ' loading' : ''}`}>
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={`Preview of your ${designInfo.name} review sign`} onLoad={() => setLoading(false)} onError={() => setLoading(false)} />
          )}
          <span className="spin" aria-hidden="true" />
        </div>
        <p className="preview-note"><Icon name="camera" size={18} /> <span>Scan the preview with your phone to test your link. The “preview” watermark isn’t on your download.</span></p>
      </div>

      <fieldset className="panel g-c">
        <legend><span className="num">3</span> Your wording</legend>
        <div className="field">
          <label htmlFor="f-headline">Headline</label>
          <select id="f-headline" value={headlineChoice} onChange={(e) => setHeadlineChoice(e.target.value)}>
            {HEADLINES.map((h) => <option key={h} value={h}>{h}</option>)}
            <option value={CUSTOM}>Write my own…</option>
          </select>
          {headlineChoice === CUSTOM && (
            <input type="text" aria-label="Your headline" maxLength={LIMITS.headline} placeholder="e.g. Loved your stay?" value={customHeadline} onChange={(e) => setCustomHeadline(e.target.value)} aria-invalid={bad === 'headline'} autoFocus />
          )}
        </div>
        <div className="field">
          <label htmlFor="f-thanks">Sign-off</label>
          <select id="f-thanks" value={thanks} onChange={(e) => setThanks(e.target.value)}>
            {THANKS.map((t) => <option key={t} value={t}>{t || 'No sign-off'}</option>)}
          </select>
        </div>
      </fieldset>

      <fieldset className="panel g-d" id="pay">
        <legend><span className="num">4</span> {edit ? 'Save your changes' : 'Get your sign'}</legend>
        {!edit && (
          <>
            <div className="field">
              <label htmlFor="f-email">Email for your files</label>
              <input id="f-email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} placeholder="you@business.co.nz" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={bad === 'email'} />
              <span className="help">We email your print pack here. No account, no newsletter.</span>
            </div>
            <div className="hp" aria-hidden="true"><label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label></div>
            <div className="checkout-sum"><div><b>{price}</b></div><span>NZD, one-off.<br />No subscription.</span></div>
            <ul className="includes">
              <li><Icon name="check" size={16} stroke={3} />Print-ready PDF: A4, 2 × A5, 4 × A6</li>
              <li><Icon name="check" size={16} stroke={3} />TV slide + QR code files (PNG, SVG)</li>
              <li><Icon name="check" size={16} stroke={3} />QR code that never expires</li>
            </ul>
          </>
        )}
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="btn big block" type="submit" disabled={busy}>
          {busy ? 'One moment…' : edit ? 'Save changes' : `Pay ${price} & get my sign`}
        </button>
        {!edit && <p className="secure"><Icon name="lock" size={16} /> Secure checkout by Stripe. Cards, Apple Pay and Google Pay.</p>}
      </fieldset>
    </form>
  );
}

/** Optional search that fills in the review link (needs GOOGLE_PLACES_API_KEY on the server). */
function Finder({ onPick }: { onPick: (name: string, url: string) => void }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<{ name: string; address: string; url: string }[] | null>(null);
  const [msg, setMsg] = useState('');
  async function search() {
    if (q.trim().length < 3) return;
    setMsg('Searching…');
    const res = await fetch(`/api/find-business?q=${encodeURIComponent(q)}`).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) { setMsg(data.error || 'Search isn’t working right now. Paste your link below instead.'); setResults(null); return; }
    setResults(data.results);
    setMsg(data.results.length ? '' : 'No matches. Try adding your town, or paste your link below.');
  }
  return (
    <div className="field">
      <label htmlFor="f-find">Find your business on Google <span className="help">(optional)</span></label>
      <div className="finder">
        <input id="f-find" type="search" placeholder="Business name and town" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } }} />
        <button type="button" className="btn ghost" onClick={search} aria-label="Search"><Icon name="search" size={20} /></button>
      </div>
      {msg && <span className="help" aria-live="polite">{msg}</span>}
      {results && results.length > 0 && (
        <ul className="results">
          {results.map((r) => (
            <li key={r.url}><button type="button" onClick={() => { onPick(r.name, r.url); setResults(null); setMsg(`Review link added for ${r.name}.`); }}><b>{r.name}</b><span>{r.address}</span></button></li>
          ))}
        </ul>
      )}
    </div>
  );
}
