/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  // The sign renderer reads its fonts and native PNG renderer at request time.
  serverExternalPackages: ['pdfkit', 'fontkit', 'svg-to-pdfkit', '@resvg/resvg-js'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./fonts/**/*'],
    '/examples/**/*': ['./fonts/**/*'],
    '/order/**/*': ['./fonts/**/*'],
    '/opengraph-image': ['./fonts/**/*'],
    '/done': ['./fonts/**/*'],
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ],
    }];
  },
  async redirects() {
    return [{ source: '/create', destination: '/#create', permanent: true }];
  },
};
export default nextConfig;
