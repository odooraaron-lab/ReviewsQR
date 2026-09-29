/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  // The sign renderer reads its fonts and native PNG renderer at request time.
  serverExternalPackages: ['pdfkit', 'fontkit', 'svg-to-pdfkit', '@resvg/resvg-js'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./fonts/**/*', './node_modules/pdfkit/js/**/*', './node_modules/pdfkit/package.json'],
    '/examples/**/*': ['./fonts/**/*', './node_modules/pdfkit/js/**/*', './node_modules/pdfkit/package.json'],
    '/order/**/*': ['./fonts/**/*', './node_modules/pdfkit/js/**/*', './node_modules/pdfkit/package.json'],
    '/opengraph-image': ['./fonts/**/*', './node_modules/pdfkit/js/**/*', './node_modules/pdfkit/package.json'],
    '/done': ['./fonts/**/*', './node_modules/pdfkit/js/**/*', './node_modules/pdfkit/package.json'],
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
