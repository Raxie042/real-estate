import { MetadataRoute } from 'next';

const BASE = 'https://raxiezenithestate.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/search',
    '/properties',
    '/about',
    '/careers',
    '/contact',
    '/agents',
    '/agencies',
    '/press',
    '/offices',
    '/financing',
    '/property-management',
    '/new-developments',
    '/commercial',
    '/auctions',
    '/stamp-duty',
    '/neighbourhoods',
    '/neighbourhoods/mayfair',
    '/neighbourhoods/knightsbridge',
    '/neighbourhoods/chelsea',
    '/neighbourhoods/notting-hill',
    '/neighbourhoods/islington',
    '/neighbourhoods/canary-wharf',
    '/neighbourhoods/richmond',
    '/neighbourhoods/hampstead',
    '/guides',
    '/resources',
    '/investor-intelligence',
    '/pricing',
    '/founding-partner',
    '/terms',
    '/privacy',
    '/cookies',
  ];

  return staticPages.map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path.startsWith('/neighbourhoods/') ? 0.6 : 0.8,
  }));
}
