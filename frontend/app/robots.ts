import { MetadataRoute } from 'next';

const BASE = 'https://raxiezenithestate.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/admin/',
          '/profile/',
          '/messages/',
          '/leads/',
          '/my-listings/',
          '/offers/',
          '/documents/',
          '/edit-listing/',
          '/listing-analytics/',
          '/subscriptions/',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
