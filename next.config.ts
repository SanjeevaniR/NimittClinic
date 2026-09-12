import type { NextConfig } from 'next';

/**
 * Security headers applied to every response.
 * `Content-Security-Policy` is intentionally conservative: the site ships no
 * third-party scripts. Google Maps is embedded via <iframe>, hence frame-src.
 */
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' is only needed by the dev-mode React refresh runtime.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "connect-src 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Fail the build on type or lint errors — never ship a broken deploy.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },

  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async redirects() {
    return [
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/doctor', destination: '/doctors', permanent: true },
    ];
  },
};

export default nextConfig;
