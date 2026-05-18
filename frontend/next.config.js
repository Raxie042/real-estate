const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: { maxEntries: 64, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static',
        expiration: { maxEntries: 128, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /\/api\/listings.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-listings',
        expiration: { maxEntries: 32, maxAgeSeconds: 5 * 60 },
      },
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'page-cache',
        expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  fallbacks: {
    document: '/offline',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
        {
          protocol: 'https',
          hostname: '**.railway.app',
        },
        {
          protocol: 'https',
          hostname: '**.vercel.app',
        },
        {
          protocol: 'https',
          hostname: '**.up.railway.app',
        },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
  experimental: {
    optimizePackageImports: ['@/components'],
  },
};

// Only wrap with Sentry when DSN is configured — zero overhead otherwise
const hasSentry = !!(process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN);

const configWithPWA = withPWA(nextConfig);

module.exports = hasSentry
  ? withSentryConfig(configWithPWA, {
      // Suppresses Sentry CLI output during builds
      silent: true,
      // Upload source maps so stack traces show real line numbers in Sentry
      hideSourceMaps: true,
      // Disable Sentry's default tree-shaking optimisations (safer default)
      disableLogger: true,
    })
  : configWithPWA;
