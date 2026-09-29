import type { Metadata, Viewport } from 'next';
import { Grandstander, Nunito } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { APP_URL, BRAND, PRODUCT, PRICE_LABEL, HQ_PRODUCT } from '@/lib/config';
import { SITE_NAME } from '@/lib/seo';
import './globals.css';

const display = Grandstander({ subsets: ['latin', 'latin-ext'], weight: ['700', '800'], variable: '--font-display', display: 'swap' });
const body = Nunito({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '700', '800'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: `Google Review QR Code Signs NZ | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: `Print-ready Google review QR code signs for NZ businesses. Paste your review link, pick a design, pay ${PRICE_LABEL} and download a PDF in a minute. No sign-up.`,
  applicationName: SITE_NAME,
  keywords: ['google review qr code', 'google review qr code sign', 'qr code for google reviews', 'review qr code nz', 'google reviews sign', 'get more google reviews', 'qr code signage', 'google review link'],
  openGraph: { siteName: SITE_NAME, locale: 'en_NZ', type: 'website' },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = { themeColor: '#2E2140', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hq = process.env.HQ_URL;
  return (
    <html lang="en-NZ" className={`${display.variable} ${body.variable}`}>
      <head>
        {hq && <script defer src={`${hq}/beacon.js`} data-product={HQ_PRODUCT} />}
      </head>
      <body>
        <Header product={PRODUCT} brand={BRAND} announce={<>No sign-up · Just <b>{PRICE_LABEL}</b> · Print-ready in a minute</>} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
