// The wording choices on the order form. Safe to import in the browser.

export const HEADLINES = [
  'Loved your visit?',
  'Enjoyed your meal?',
  'Enjoyed your coffee?',
  'How did we do?',
  'Happy with our service?',
  'Tell us what you think!',
];

export const THANKS = [
  'Thank you for your support!',
  'Ngā mihi, thank you!',
  'Thanks for supporting local!',
  'We read every review. Thank you!',
  '',
];

export const LIMITS = { business: 40, headline: 30, thanks: 36, url: 600 };

export const CTA = 'Scan to leave us a Google review';
export const CARD_CAPTION = 'Point your phone camera here';

export type SignInput = {
  business: string;
  headline: string;
  thanks: string;
  url: string;
  design: string;
};

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Tidies what someone typed. Returns null if the review link isn't a usable web address. */
export function normaliseUrl(raw: unknown): string | null {
  let s = String(raw ?? '').trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.') || s.length > LIMITS.url) return null;
    return u.toString();
  } catch {
    return null;
  }
}

/** Google's own review-link hosts. Anything else still works, with a gentle warning. */
export function looksLikeGoogle(url: string) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    return /(^|\.)google\.[a-z.]+$/.test(h) || ['g.page', 'goo.gl', 'maps.app.goo.gl', 'g.co', 'search.google.com'].includes(h);
  } catch {
    return false;
  }
}

export function cleanInput(b: Record<string, unknown>): SignInput {
  return {
    business: clean(b.business, LIMITS.business),
    headline: clean(b.headline, LIMITS.headline),
    thanks: clean(b.thanks, LIMITS.thanks),
    url: normaliseUrl(b.url) ?? '',
    design: clean(b.design, 20),
  };
}
