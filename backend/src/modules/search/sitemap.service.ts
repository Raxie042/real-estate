import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SitemapService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate XML sitemap for search engines
   */
  async generateSitemap(baseUrl: string): Promise<string> {
    const listings = await this.prisma.listing.findMany({
      select: { id: true, updatedAt: true },
      where: { deletedAt: null, status: 'ACTIVE' },
    });

    const urls = [
      // Static pages
      { loc: baseUrl, lastmod: new Date().toISOString(), priority: '1.0' },
      { loc: `${baseUrl}/properties`, lastmod: new Date().toISOString(), priority: '0.9' },
      { loc: `${baseUrl}/advanced-search`, lastmod: new Date().toISOString(), priority: '0.8' },
      {
        loc: `${baseUrl}/about`,
        lastmod: new Date().toISOString(),
        priority: '0.7',
      },
      { loc: `${baseUrl}/contact`, lastmod: new Date().toISOString(), priority: '0.7' },

      // Property pages
      ...listings.map((listing) => ({
        loc: `${baseUrl}/properties/${listing.id}`,
        lastmod: listing.updatedAt.toISOString(),
        priority: '0.8',
      })),
    ];

    return this.generateXml(urls);
  }

  /**
   * Generate robots.txt
   */
  generateRobotsTxt(baseUrl: string): string {
    return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /dashboard
Disallow: /profile
Disallow: /favorites
Disallow: /saved-searches
Disallow: /edit-

Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for courtesy
Crawl-delay: 1
Request-rate: 1/1s
`;
  }

  /**
   * Private helper to generate XML
   */
  private generateXml(urls: Array<{ loc: string; lastmod: string; priority: string }>): string {
    const xmlContent = urls
      .map(
        (url) => `
  <url>
    <loc>${this.escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>
`,
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlContent}</urlset>`;
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(str: string): string {
    const xmlChars: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };

    return str.replace(/[&<>"']/g, (char) => xmlChars[char]);
  }
}
