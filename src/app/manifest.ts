import type { MetadataRoute } from 'next';
import { PRODUCT, BRAND } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT} by ${BRAND}`,
    short_name: PRODUCT,
    description: 'Print-ready Google review QR code signs for NZ businesses.',
    start_url: '/',
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: '#2E2140',
    icons: [
      { src: '/icon1.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
