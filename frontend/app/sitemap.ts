import { MetadataRoute } from 'next';

const BASE = 'https://raxiezenithestate.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getListingIds(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/listings?limit=1000&status=active`, {
      next: { revalidate: 3600 }, // rebuild sitemap hourly
    });
    if (!res.ok) return [];
    const data = await res.json();
    const listings = Array.isArray(data) ? data : data.listings ?? data.data ?? [];
    return listings.map((l: { id: string }) => l.id).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: '/', priority: 1.0, freq: 'daily' as const },
    { path: '/search', priority: 0.9, freq: 'daily' as const },
    { path: '/properties', priority: 0.9, freq: 'daily' as const },
    { path: '/about', priority: 0.7, freq: 'monthly' as const },
    { path: '/agents', priority: 0.7, freq: 'weekly' as const },
    { path: '/agencies', priority: 0.7, freq: 'weekly' as const },
    { path: '/pricing', priority: 0.7, freq: 'monthly' as const },
    { path: '/valuation', priority: 0.8, freq: 'weekly' as const },
    { path: '/list-property', priority: 0.8, freq: 'monthly' as const },
    { path: '/contact', priority: 0.6, freq: 'monthly' as const },
    { path: '/careers', priority: 0.6, freq: 'weekly' as const },
    { path: '/investor-intelligence', priority: 0.7, freq: 'weekly' as const },
    { path: '/founding-partner', priority: 0.6, freq: 'monthly' as const },
    { path: '/guides', priority: 0.6, freq: 'weekly' as const },
    { path: '/resources', priority: 0.6, freq: 'weekly' as const },
    { path: '/new-developments', priority: 0.7, freq: 'weekly' as const },
    { path: '/commercial', priority: 0.7, freq: 'weekly' as const },
    { path: '/auctions', priority: 0.7, freq: 'weekly' as const },
    { path: '/financing', priority: 0.6, freq: 'monthly' as const },
    { path: '/neighbourhoods/mayfair', priority: 0.7, freq: 'weekly' as const },
    { path: '/neighbourhoods/knightsbridge', priority: 0.7, freq: 'weekly' as const },
    { path: '/neighbourhoods/chelsea', priority: 0.7, freq: 'weekly' as const },
    { path: '/neighbourhoods/notting-hill', priority: 0.7, freq: 'weekly' as const },
    { path: '/neighbourhoods/islington', priority: 0.6, freq: 'weekly' as const },
    { path: '/neighbourhoods/canary-wharf', priority: 0.6, freq: 'weekly' as const },
    { path: '/neighbourhoods/richmond', priority: 0.6, freq: 'weekly' as const },
    { path: '/neighbourhoods/hampstead', priority: 0.6, freq: 'weekly' as const },
    { path: '/press', priority: 0.5, freq: 'weekly' as const },
    { path: '/stamp-duty', priority: 0.5, freq: 'monthly' as const },
    { path: '/terms', priority: 0.3, freq: 'yearly' as const },
    { path: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/cookies', priority: 0.3, freq: 'yearly' as const },
  ];

  const listingIds = await getListingIds();

  const listingEntries: MetadataRoute.Sitemap = listingIds.map((id) => ({
    url: `${BASE}/properties/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  return [...staticEntries, ...listingEntries];
}

