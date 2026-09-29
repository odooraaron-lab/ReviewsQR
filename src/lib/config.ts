// Everything a person might want to change without touching the pages lives here or in env vars.

export const BRAND = process.env.BRAND_NAME || 'myQR';
export const PRODUCT = process.env.PRODUCT_NAME || 'Review QR';
export const APP_URL = (process.env.APP_URL || (process.env.NODE_ENV === 'production' ? 'https://reviews.myqr.co.nz' : 'http://localhost:3000')).replace(/\/+$/, '');
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'adminmyqr@gmail.com';

/** One price, in cents. $5.99 NZD unless PRICE_CENTS says otherwise. */
export const PRICE_CENTS = Math.max(100, Number(process.env.PRICE_CENTS || 599));
export const CURRENCY = 'nzd';
export const PRICE_LABEL = `$${(PRICE_CENTS / 100).toFixed(2)}`;

/** The admin's product code. Stripe metadata and the admin both use it. */
export const HQ_PRODUCT = process.env.HQ_PRODUCT || 'reviews';

/** The other myQR site we cross-sell for putting the sign on a TV. */
export const SIGNAGE_URL = 'https://digitalsignage.myqr.co.nz';

/** Short host for print and emails, e.g. reviews.myqr.co.nz */
export const APP_HOST = APP_URL.replace(/^https?:\/\//, '');

/** Payments are faked (orders marked paid straight away) only on a developer's own machine without Stripe keys. */
export const DEV_CHECKOUT = !process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== 'production';
