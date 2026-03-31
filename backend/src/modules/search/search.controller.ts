import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';
import { SitemapService } from './sitemap.service';

@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
    private sitemapService: SitemapService,
  ) {}

  @Post('radius')
  async searchByRadius(
    @Body()
    body: {
      latitude: number;
      longitude: number;
      radiusKm: number;
      page?: number;
      limit?: number;
      minPrice?: number;
      maxPrice?: number;
      propertyType?: string;
      listingType?: string;
      sortBy?: 'distance' | 'price' | 'newest';
    },
  ) {
    return this.searchService.searchByRadius(body);
  }

  @Post('bounds')
  async searchByBounds(
    @Body()
    body: {
      north: number;
      south: number;
      east: number;
      west: number;
      page?: number;
      limit?: number;
      minPrice?: number;
      maxPrice?: number;
      propertyType?: string;
      listingType?: string;
      sortBy?: 'price' | 'newest' | 'popular';
    },
  ) {
    return this.searchService.searchByBounds(body);
  }

  @Post('advanced')
  async advancedSearch(@Body() body: any) {
    return this.searchService.advancedSearch(body);
  }

  @Get('suggestions')
  async getSearchSuggestions(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter "q" is required');
    }
    return this.searchService.getSearchSuggestions(query);
  }

  @Post('save')
  async saveSearch(
    @Body()
    body: {
      userId: string;
      name: string;
      filters: Record<string, any>;
    },
  ) {
    return this.searchService.saveSearch(body.userId, body.name, body.filters);
  }

  @Get('saved/:userId')
  async getSavedSearches(@Query('userId') userId: string) {
    return this.searchService.getSavedSearches(userId);
  }

  @Post('saved/:searchId/run')
  async runSavedSearch(@Query('searchId') searchId: string, @Query('userId') userId: string) {
    return this.searchService.runSavedSearch(searchId, userId);
  }

  @Post('saved/:searchId/delete')
  async deleteSavedSearch(@Query('searchId') searchId: string, @Query('userId') userId: string) {
    return this.searchService.deleteSavedSearch(searchId, userId);
  }

  @Get('sitemap.xml')
  async getSitemap(@Query('baseUrl') baseUrl: string = 'https://realestate.app') {
    return this.sitemapService.generateSitemap(baseUrl);
  }

  @Get('robots.txt')
  async getRobots(@Query('baseUrl') baseUrl: string = 'https://realestate.app') {
    return this.sitemapService.generateRobotsTxt(baseUrl);
  }
}
