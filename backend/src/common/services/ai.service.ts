import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

/**
 * AI-powered features for real estate
 * Requires: OpenAI API key in OPENAI_API_KEY env var
 */
@Injectable()
export class AIService {
  private openaiApiKey = process.env.OPENAI_API_KEY;

  constructor(private prisma: PrismaService) {}

  /**
   * Generate property description using AI
   */
  async generatePropertyDescription(listingData: {
    title: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    features: string[];
    neighborhood?: string;
  }): Promise<string> {
    try {
      // Mock response until OpenAI SDK is integrated
      return `Welcome to this beautiful ${listingData.bedrooms}-bedroom home. This ${listingData.squareFeet}-square-foot residence built in ${listingData.yearBuilt} features ${listingData.bathrooms} bathrooms and an array of modern amenities including ${listingData.features.slice(0, 3).join(', ')}. Perfect for families seeking comfort and style.`;
    } catch (error) {
      console.error('AI description generation failed:', error);
      return '';
    }
  }

  /**
   * Recommend properties for user based on preferences
   */
  async recommendProperties(userId: string, limit = 10) {
    // Get user preferences from saved searches
    const savedSearches = await this.prisma.savedSearch.findMany({
      where: { userId },
    });

    if (!savedSearches.length) {
      // Fallback: get trending properties
      return this.prisma.listing.findMany({
        where: { status: 'ACTIVE' },
        orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      });
    }

    // Combine filters from all saved searches
    const searches = savedSearches.map((s) => s.filters as any);
    const avgPrice = searches.reduce((sum, s) => sum + (s.priceMax || 0), 0) / searches.length;
    const preferredBeds = Math.round(
      searches.reduce((sum, s) => sum + (s.bedrooms || 0), 0) / searches.length,
    );
    const preferredTypes = [...new Set(searches.flatMap((s) => s.propertyTypes || []))];

    // Find matching properties with scoring
    const properties = await this.prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        price: {
          gte: avgPrice * 0.8,
          lte: avgPrice * 1.2,
        },
        ...(preferredBeds && { bedrooms: { gte: preferredBeds - 1, lte: preferredBeds + 1 } }),
        ...(preferredTypes.length && { propertyType: { in: preferredTypes } }),
      },
      take: limit * 2,
    });

    // Score and rank
    return properties
      .map((p) => ({
        ...p,
        score: this.calculateRecommendationScore(p, savedSearches),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Calculate property recommendation score
   */
  private calculateRecommendationScore(property: any, savedSearches: any[]): number {
    let score = 0;

    for (const search of savedSearches) {
      const filters = search.filters;

      // Price match
      if (property.price >= filters.priceMin && property.price <= filters.priceMax) {
        score += 30;
      }

      // Bedroom match
      if (filters.bedrooms && property.bedrooms >= filters.bedrooms) {
        score += 20;
      }

      // Property type match
      if (filters.propertyTypes?.includes(property.propertyType)) {
        score += 25;
      }

      // Amenity match
      if (filters.amenities?.length) {
        const amenitiesMatch = filters.amenities.filter((a: string) =>
          property.features?.includes(a),
        ).length;
        score += amenitiesMatch * 5;
      }
    }

    return score;
  }

  /**
   * Market analysis and price prediction
   */
  async analyzeMarket(city: string, state: string) {
    const properties = await this.prisma.listing.findMany({
      where: {
        city,
        state,
        status: 'ACTIVE',
        price: { gt: 0 },
      },
      select: { price: true, sqft: true, bedrooms: true, createdAt: true },
    });

    if (properties.length === 0) {
      return { market: 'No data available', properties: 0, avgPrice: 0 };
    }

    const prices = properties.map((p) => Number(p.price));
    const avgPrice = prices.reduce((sum, p) => sum + p, 0) / properties.length;
    const pricePerSqft =
      properties.filter((p) => p.sqft).reduce((sum, p) => sum + Number(p.price) / p.sqft!, 0) /
      properties.length;

    // Trend analysis (simplified)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentProperties = properties.filter((p) => new Date(p.createdAt) > thirtyDaysAgo);
    const recentPrices = recentProperties.map((p) => Number(p.price));
    const recentAvgPrice =
      recentProperties.length > 0
        ? recentPrices.reduce((sum, p) => sum + p, 0) / recentProperties.length
        : avgPrice;

    const trend =
      recentAvgPrice > avgPrice * 1.05
        ? 'UP'
        : recentAvgPrice < avgPrice * 0.95
          ? 'DOWN'
          : 'STABLE';

    return {
      city,
      state,
      totalListings: properties.length,
      averagePrice: Math.round(avgPrice),
      pricePerSquareFoot: Math.round(pricePerSqft),
      medianPrice: this.getMedian(prices),
      marketTrend: trend,
      trend30Days: ((recentAvgPrice / avgPrice - 1) * 100).toFixed(1),
      insights: this.generateMarketInsights(trend, recentAvgPrice, avgPrice),
    };
  }

  /**
   * Generate market insights
   */
  private generateMarketInsights(trend: string, recent: number, overall: number): string[] {
    const insights: string[] = [];

    if (trend === 'UP') {
      insights.push('Strong seller market with rising prices');
      insights.push('Appreciation opportunity for investors');
    } else if (trend === 'DOWN') {
      insights.push('Buyer market with declining prices');
      insights.push('Great negotiation opportunity');
    } else {
      insights.push('Stable market conditions');
      insights.push('Good time for both buyers and sellers');
    }

    const percentChange = ((recent / overall - 1) * 100).toFixed(1);
    insights.push(
      `Prices ${recent > overall ? 'increased' : 'decreased'} ${percentChange}% in last 30 days`,
    );

    return insights;
  }

  /**
   * Predict property price based on comparable sales
   */
  async predictPropertyPrice(listingData: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    city: string;
    state: string;
  }): Promise<{ prediction: number; range: { low: number; high: number }; confidence: number }> {
    // Get comparable properties (same city, similar size/beds)
    const comparables = await this.prisma.listing.findMany({
      where: {
        city: listingData.city,
        state: listingData.state,
        bedrooms: { gte: listingData.bedrooms - 1, lte: listingData.bedrooms + 1 },
        bathrooms: { gte: (listingData.bathrooms || 1) - 1, lte: (listingData.bathrooms || 1) + 1 },
        status: { in: ['SOLD', 'ACTIVE'] },
      },
      select: { price: true, sqft: true, yearBuilt: true },
    });

    if (comparables.length < 3) {
      return {
        prediction: 0,
        range: { low: 0, high: 0 },
        confidence: 0,
      };
    }

    // Calculate price per sqft factor
    const comparablePrices = comparables
      .filter((c) => c.sqft)
      .map((c) => Number(c.price) / c.sqft!);
    const pricePerSqft = comparablePrices.reduce((sum, p) => sum + p, 0) / comparablePrices.length;

    const predictedPrice = listingData.squareFeet * pricePerSqft;

    // Age adjustment
    const avgYearBuilt =
      comparables.reduce((sum, c) => sum + (c.yearBuilt ?? 2000), 0) / comparables.length;
    const ageAdjustment = 1 - ((listingData.yearBuilt ?? 2000) - avgYearBuilt) * 0.01;

    const adjustedPrice = predictedPrice * ageAdjustment;

    return {
      prediction: Math.round(adjustedPrice),
      range: {
        low: Math.round(adjustedPrice * 0.9),
        high: Math.round(adjustedPrice * 1.1),
      },
      confidence: Math.min(95, 50 + comparables.length * 5),
    };
  }

  /**
   * Get median from array
   */
  private getMedian(arr: number[]): number {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  /**
   * Get neighborhood insights
   */
  async getNeighborhoodInsights(latitude: number, longitude: number, radiusKm = 1) {
    // Find properties within radius
    const properties = await this.prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { price: true, latitude: true, longitude: true, bedrooms: true },
    });

    // Filter by distance
    const nearby = properties.filter((p) => {
      const distance = this.calculateDistance(latitude, longitude, p.latitude, p.longitude);
      return distance <= radiusKm;
    });

    const avgPrice =
      nearby.length > 0 ? nearby.reduce((sum, p) => sum + Number(p.price), 0) / nearby.length : 0;
    const avgBeds =
      nearby.length > 0 ? nearby.reduce((sum, p) => sum + (p.bedrooms ?? 0), 0) / nearby.length : 0;

    return {
      propertiesNearby: nearby.length,
      averagePrice: Math.round(avgPrice),
      averageBedrooms: Math.round(avgBeds * 10) / 10,
      priceRange: {
        low: Math.round(Math.min(...nearby.map((p) => Number(p.price)))),
        high: Math.round(Math.max(...nearby.map((p) => Number(p.price)))),
      },
    };
  }

  /**
   * Calculate distance between coordinates (Haversine formula)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
