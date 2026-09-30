import type { Metadata } from 'next';
import { APP_URL, BRAND, PRODUCT, PRICE_CENTS } from './config';

// The public address, for canonical links, the sitemap and structured data.
export const SITE = APP_URL;
export const SITE_NAME = `${PRODUCT} by ${BRAND}`;
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: `${PRODUCT}: Google review QR code signs, ready to print` };

/** Page metadata with a canonical link and matching social-share text. */
export function pageMeta(path: string, title: string, description: string, extra: Metadata = {}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path || '/' },
    openGraph: { title, description, url: path || '/', siteName: SITE_NAME, locale: 'en_NZ', type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...extra,
  };
}

/** Structured data for Google. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const organizationLd = () => ({
  '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: SITE, logo: `${SITE}/icon1.png`, areaServed: 'NZ',
  description: 'myQR makes simple QR code and TV screen tools for New Zealand businesses and parties.',
});

export const websiteLd = () => ({
  '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, alternateName: [PRODUCT, 'myQR Review QR'], url: SITE, inLanguage: 'en-NZ',
});

// Digital products: delivered instantly online in NZ, so shipping is free and immediate. Returns follow our
// terms (no refunds except where the law requires). Google asks for both on merchant listings.
export const DIGITAL_OFFER = {
  shippingDetails: {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'NZD' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'NZ' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
    },
  },
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'NZ',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  },
};

export const productLd = (path = '') => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Google Review QR Code Sign Pack',
  description: 'A print-ready Google review QR code sign in your choice of six designs: A4 poster, A5 table signs, A6 counter cards, a 1920×1080 TV slide and the QR code on its own. Emailed instantly.',
  brand: { '@type': 'Brand', name: BRAND },
  image: [`${SITE}/examples/cafe.png`, `${SITE}/examples/midnight.png`, `${SITE}/opengraph-image`],
  url: `${SITE}${path || '/'}`,
  category: 'Business signage',
  offers: {
    '@type': 'Offer',
    price: (PRICE_CENTS / 100).toFixed(2),
    priceCurrency: 'NZD',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/#create`,
    areaServed: 'NZ',
    ...DIGITAL_OFFER,
  },
});

export const faqLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.path || '/'}` })),
});

export const howToLd = () => ({
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to make a Google review QR code sign',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'NZD', value: (PRICE_CENTS / 100).toFixed(2) },
  step: [
    { '@type': 'HowToStep', name: 'Paste your Google review link', text: 'Copy your review link from your Google Business Profile and paste it into the form.' },
    { '@type': 'HowToStep', name: 'Pick a design', text: 'Choose one of six designs and your wording. The preview updates as you type.' },
    { '@type': 'HowToStep', name: 'Pay and download', text: 'Pay once and get a print-ready PDF, TV slide and QR code files straight away, also by email.' },
  ],
});
