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

module.exports = nextConfig;
