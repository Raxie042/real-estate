import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import axios from 'axios';
import { ListingStatus } from '@prisma/client';

/**
 * AI-powered features for real estate
 * Requires: OpenAI API key in OPENAI_API_KEY env var
 */
@Injectable()
export class AIService {
  private openaiApiKey = process.env.OPENAI_API_KEY;
  private exchangeRatesApiKey = process.env.EXCHANGE_RATE_API_KEY;
  private countryAliasToCanonical: Record<string, { name: string; code: string }> = {
    US: { name: 'United States', code: 'US' },
    USA: { name: 'United States', code: 'US' },
    'UNITED STATES': { name: 'United States', code: 'US' },
    'UNITED STATES OF AMERICA': { name: 'United States', code: 'US' },
    UK: { name: 'United Kingdom', code: 'GB' },
    GB: { name: 'United Kingdom', code: 'GB' },
    GBR: { name: 'United Kingdom', code: 'GB' },
    'UNITED KINGDOM': { name: 'United Kingdom', code: 'GB' },
    ENGLAND: { name: 'United Kingdom', code: 'GB' },
    UAE: { name: 'United Arab Emirates', code: 'AE' },
    AE: { name: 'United Arab Emirates', code: 'AE' },
    'UNITED ARAB EMIRATES': { name: 'United Arab Emirates', code: 'AE' },
    KSA: { name: 'Saudi Arabia', code: 'SA' },
    SA: { name: 'Saudi Arabia', code: 'SA' },
    'SAUDI ARABIA': { name: 'Saudi Arabia', code: 'SA' },
  };

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
      if (this.openaiApiKey) {
        const prompt = [
          `Write a compelling, concise real-estate listing description (120-180 words).`,
          `Title: ${listingData.title}`,
          `Bedrooms: ${listingData.bedrooms}`,
          `Bathrooms: ${listingData.bathrooms}`,
          `Square feet: ${listingData.squareFeet}`,
          `Year built: ${listingData.yearBuilt}`,
          `Features: ${listingData.features.join(', ')}`,
          `Neighborhood: ${listingData.neighborhood || 'N/A'}`,
          `Tone: professional, premium, factual, no emoji.`,
        ].join('\n');

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You write high-converting property listing copy for real-estate platforms.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.6,
          },
          {
            headers: {
              Authorization: `Bearer ${this.openaiApiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 12000,
          },
        );

        const generated = response.data?.choices?.[0]?.message?.content?.trim();
        if (generated) {
          return generated;
        }
      }

      // Fallback generation when OpenAI key is not configured.
      const topFeatures = listingData.features.slice(0, 4).join(', ');
      return `${listingData.title} is a thoughtfully designed ${listingData.bedrooms}-bedroom, ${listingData.bathrooms}-bathroom home spanning approximately ${listingData.squareFeet} square feet. Built in ${listingData.yearBuilt}, this property blends timeless character with practical comfort for modern living. Highlights include ${topFeatures || 'well-planned interiors and functional spaces'}, offering flexibility for families, professionals, or investors. ${listingData.neighborhood ? `Located in ${listingData.neighborhood},` : 'Situated in a sought-after area,'} the home is close to everyday amenities, commuter routes, and lifestyle conveniences. With strong long-term value and move-in-ready appeal, this residence is an excellent opportunity for buyers seeking quality, location, and livability.`;
    } catch (error) {
      console.error('AI description generation failed:', error);
      return `${listingData.title} is a ${listingData.bedrooms}-bedroom, ${listingData.bathrooms}-bathroom property with approximately ${listingData.squareFeet} square feet of interior space. Built in ${listingData.yearBuilt}, it offers practical layout, modern comfort, and standout features such as ${listingData.features.slice(0, 3).join(', ') || 'quality finishes'}.`;
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
    const validPriceCaps = searches
      .map((s) => Number(s.priceMax || s.maxPrice || 0))
      .filter((value) => Number.isFinite(value) && value > 0);
    const avgPrice = validPriceCaps.length
      ? validPriceCaps.reduce((sum, value) => sum + value, 0) / validPriceCaps.length
      : 0;
    const preferredBeds = Math.round(
      searches.reduce((sum, s) => sum + Number(s.bedrooms || s.minBedrooms || 0), 0) /
        searches.length,
    );
    const preferredTypes = [...new Set(searches.flatMap((s) => s.propertyTypes || s.types || []))];

    // Find matching properties with scoring
    const properties = await this.prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        ...(avgPrice
          ? {
              price: {
                gte: avgPrice * 0.8,
                lte: avgPrice * 1.2,
              },
            }
          : {}),
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
      const minPrice = Number(filters.priceMin || filters.minPrice || 0);
      const maxPrice = Number(filters.priceMax || filters.maxPrice || 0);
      const hasPriceRange = minPrice > 0 && maxPrice > 0;
      if (hasPriceRange && property.price >= minPrice && property.price <= maxPrice) {
        score += 30;
      }

      // Bedroom match
      const targetBedrooms = Number(filters.bedrooms || filters.minBedrooms || 0);
      if (targetBedrooms && property.bedrooms >= targetBedrooms) {
        score += 20;
      }

      // Property type match
      const types = filters.propertyTypes || filters.types || [];
      if (types.includes(property.propertyType)) {
        score += 25;
      }

      // Amenity match
      const amenities = filters.amenities || [];
      if (amenities.length) {
        const listingFeatures = Array.isArray(property.features) ? property.features : [];
        const amenitiesMatch = amenities.filter((a: string) =>
          listingFeatures.includes(a),
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

    const prices = nearby.map((p) => Number(p.price));

    return {
      propertiesNearby: nearby.length,
      averagePrice: Math.round(avgPrice),
      averageBedrooms: Math.round(avgBeds * 10) / 10,
      priceRange: {
        low: prices.length ? Math.round(Math.min(...prices)) : 0,
        high: prices.length ? Math.round(Math.max(...prices)) : 0,
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

  async predictGlobalHighGrowthAreas(limit = 20, minListings = 8) {
    const now = new Date();
    const recentWindowStart = new Date(now);
    recentWindowStart.setDate(now.getDate() - 90);

    const previousWindowStart = new Date(now);
    previousWindowStart.setDate(now.getDate() - 180);

    const listings = await this.prisma.listing.findMany({
      where: {
        deletedAt: null,
        status: { in: ['ACTIVE', 'PENDING', 'SOLD', 'RENTED'] },
      },
      select: {
        id: true,
        city: true,
        state: true,
        country: true,
        countryCode: true,
        price: true,
        viewCount: true,
        inquiryCount: true,
        createdAt: true,
        status: true,
      },
    });

    const areaMap = new Map<
      string,
      {
        city: string;
        state: string | null;
        country: string;
        countryCode: string;
        total: number;
        recent: number;
        previous: number;
        recentPrices: number[];
        previousPrices: number[];
        totalViews: number;
        totalInquiries: number;
      }
    >();

    for (const listing of listings) {
      const normalizedCountry = this.normalizeCountry(listing.country, listing.countryCode);
      const key = `${listing.city}|${listing.state || ''}|${normalizedCountry.name}`;
      const existing = areaMap.get(key) || {
        city: listing.city,
        state: listing.state,
        country: normalizedCountry.name,
        countryCode: normalizedCountry.code,
        total: 0,
        recent: 0,
        previous: 0,
        recentPrices: [],
        previousPrices: [],
        totalViews: 0,
        totalInquiries: 0,
      };

      existing.total += 1;
      existing.totalViews += Number(listing.viewCount || 0);
      existing.totalInquiries += Number(listing.inquiryCount || 0);

      const price = Number(listing.price || 0);
      const createdAt = new Date(listing.createdAt);

      if (createdAt >= recentWindowStart) {
        existing.recent += 1;
        if (price > 0) existing.recentPrices.push(price);
      } else if (createdAt >= previousWindowStart) {
        existing.previous += 1;
        if (price > 0) existing.previousPrices.push(price);
      }

      areaMap.set(key, existing);
    }

    const scored = [...areaMap.values()]
      .filter((area) => area.total >= minListings)
      .map((area) => {
        const recentAvg =
          area.recentPrices.length > 0
            ? area.recentPrices.reduce((sum, price) => sum + price, 0) / area.recentPrices.length
            : 0;
        const previousAvg =
          area.previousPrices.length > 0
            ? area.previousPrices.reduce((sum, price) => sum + price, 0) /
              area.previousPrices.length
            : recentAvg;

        const inventoryMomentum = area.previous > 0 ? (area.recent - area.previous) / area.previous : 0;
        const priceMomentum = previousAvg > 0 ? (recentAvg - previousAvg) / previousAvg : 0;
        const demandSignal = area.total > 0 ? (area.totalInquiries + area.totalViews * 0.1) / area.total : 0;

        const growthScore =
          inventoryMomentum * 35 +
          priceMomentum * 45 +
          Math.min(20, demandSignal / 8);

        return {
          area: {
            city: area.city,
            state: area.state,
            country: area.country,
            countryCode: area.countryCode,
          },
          metrics: {
            totalListings: area.total,
            recentListings90d: area.recent,
            priorListings90d: area.previous,
            averagePriceRecent: Math.round(recentAvg),
            averagePricePrior: Math.round(previousAvg),
            inventoryMomentum: Number((inventoryMomentum * 100).toFixed(2)),
            priceMomentum: Number((priceMomentum * 100).toFixed(2)),
            averageDemandSignal: Number(demandSignal.toFixed(2)),
          },
          growthScore: Number(growthScore.toFixed(2)),
          confidence: Math.min(95, 40 + Math.round(area.total * 1.2)),
        };
      })
      .sort((first, second) => second.growthScore - first.growthScore)
      .slice(0, limit);

    return {
      generatedAt: new Date().toISOString(),
      methodology:
        'Growth score blends listing momentum, price momentum, and demand signal over rolling 90-day windows.',
      areas: scored,
    };
  }

  async compareGlobalRoi(input: {
    investmentAmount?: number;
    holdingPeriodYears?: number;
    targetCountries?: string[];
    propertyType?: string;
    listingType?: 'SALE' | 'RENT' | 'LEASE';
  }) {
    const investmentAmount = Math.max(10000, Number(input.investmentAmount || 500000));
    const holdingPeriodYears = Math.max(1, Number(input.holdingPeriodYears || 5));

    const normalizedTargets = (input.targetCountries || [])
      .map((country) => this.normalizeCountry(country).name)
      .filter(Boolean);

    const listingFilter = {
      deletedAt: null,
      status: { in: ['ACTIVE', 'PENDING', 'SOLD', 'RENTED'] as ListingStatus[] },
      ...(input.propertyType ? { propertyType: input.propertyType as any } : {}),
      ...(input.listingType ? { listingType: input.listingType as any } : {}),
    };

    const listings = await this.prisma.listing.findMany({
      where: listingFilter,
      select: {
        country: true,
        countryCode: true,
        price: true,
        listingType: true,
        createdAt: true,
        currency: true,
      },
    });

    const fxMap = await this.getUsdFxMap();

    const grouped = new Map<
      string,
      {
        country: string;
        countryCode: string;
        salePricesUsd: number[];
        monthlyRentsUsd: number[];
        recentPricesUsd: number[];
        priorPricesUsd: number[];
      }
    >();

    const now = new Date();
    const recentCutoff = new Date(now);
    recentCutoff.setDate(now.getDate() - 365);

    for (const listing of listings) {
      const fx = fxMap[listing.currency] || 1;
      const priceUsd = Number(listing.price || 0) * fx;
      if (!priceUsd || priceUsd <= 0) continue;

      const normalized = this.normalizeCountry(listing.country, listing.countryCode);
      if (normalizedTargets.length && !normalizedTargets.includes(normalized.name)) {
        continue;
      }

      const key = `${normalized.name}|${normalized.code}`;
      const current = grouped.get(key) || {
        country: normalized.name,
        countryCode: normalized.code,
        salePricesUsd: [],
        monthlyRentsUsd: [],
        recentPricesUsd: [],
        priorPricesUsd: [],
      };

      if (listing.listingType === 'SALE') current.salePricesUsd.push(priceUsd);
      if (listing.listingType === 'RENT' || listing.listingType === 'LEASE') {
        current.monthlyRentsUsd.push(priceUsd);
      }

      if (new Date(listing.createdAt) >= recentCutoff) current.recentPricesUsd.push(priceUsd);
      else current.priorPricesUsd.push(priceUsd);

      grouped.set(key, current);
    }

    const comparisons = [...grouped.values()]
      .map((item) => {
        const medianSale = this.getMedian(item.salePricesUsd);
        if (!medianSale) return null;

        const avgMonthlyRent =
          item.monthlyRentsUsd.length > 0
            ? item.monthlyRentsUsd.reduce((sum, value) => sum + value, 0) /
              item.monthlyRentsUsd.length
            : medianSale * 0.0045;

        const grossYield = (avgMonthlyRent * 12) / medianSale;

        const recentAvg =
          item.recentPricesUsd.length > 0
            ? item.recentPricesUsd.reduce((sum, value) => sum + value, 0) /
              item.recentPricesUsd.length
            : medianSale;
        const priorAvg =
          item.priorPricesUsd.length > 0
            ? item.priorPricesUsd.reduce((sum, value) => sum + value, 0) /
              item.priorPricesUsd.length
            : recentAvg;

        const annualAppreciation = priorAvg > 0 ? (recentAvg - priorAvg) / priorAvg : 0;

        const operatingCostRatio = 0.28;
        const netYield = grossYield * (1 - operatingCostRatio);

        const totalRoi = netYield * holdingPeriodYears + annualAppreciation * holdingPeriodYears;

        const typicalUnits = Math.max(1, Math.floor(investmentAmount / medianSale));

        return {
          country: item.country,
          countryCode: item.countryCode,
          benchmarks: {
            medianSalePriceUsd: Math.round(medianSale),
            averageMonthlyRentUsd: Math.round(avgMonthlyRent),
            grossYieldPct: Number((grossYield * 100).toFixed(2)),
            netYieldPct: Number((netYield * 100).toFixed(2)),
            annualAppreciationPct: Number((annualAppreciation * 100).toFixed(2)),
          },
          investorScenario: {
            investmentAmountUsd: investmentAmount,
            estimatedUnits: typicalUnits,
            projectedRoiPct: Number((totalRoi * 100).toFixed(2)),
            projectedProfitUsd: Math.round(investmentAmount * totalRoi),
            horizonYears: holdingPeriodYears,
          },
          score: Number((totalRoi * 100 + netYield * 30).toFixed(2)),
        };
      })
      .flatMap((item) => (item ? [item] : []))
      .sort((first, second) => second.score - first.score);

    return {
      generatedAt: new Date().toISOString(),
      assumptions: {
        operatingCostRatio: 0.28,
        fallbackMonthlyRentFactor: 0.0045,
      },
      comparisons,
    };
  }

  async findOffMarketLuxuryDeals(input: {
    countries?: string[];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    propertyTypes?: string[];
    limit?: number;
  }) {
    const limit = Math.min(100, Math.max(1, Number(input.limit || 25)));

    const base = await this.prisma.listing.findMany({
      where: {
        deletedAt: null,
        status: { in: ['DRAFT', 'PENDING', 'WITHDRAWN', 'ACTIVE'] },
        ...(input.minBedrooms ? { bedrooms: { gte: Number(input.minBedrooms) } } : {}),
        ...(input.propertyTypes?.length ? { propertyType: { in: input.propertyTypes as any } } : {}),
      },
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        country: true,
        countryCode: true,
        price: true,
        bedrooms: true,
        bathrooms: true,
        sqft: true,
        status: true,
        listingType: true,
        propertyType: true,
        mlsSource: true,
        isVerified: true,
        inquiryCount: true,
        viewCount: true,
        createdAt: true,
        images: true,
      },
      take: 1000,
    });

    const byCountry = new Map<string, number[]>();
    for (const listing of base) {
      const price = Number(listing.price || 0);
      if (!price) continue;
      const arr = byCountry.get(listing.countryCode) || [];
      arr.push(price);
      byCountry.set(listing.countryCode, arr);
    }

    const countryLuxuryThreshold = new Map<string, number>();
    for (const [countryCode, prices] of byCountry.entries()) {
      const sorted = [...prices].sort((first, second) => first - second);
      const idx = Math.floor(sorted.length * 0.8);
      countryLuxuryThreshold.set(countryCode, sorted[Math.max(0, Math.min(idx, sorted.length - 1))]);
    }

    const deals = base
      .map((listing) => {
        const normalized = this.normalizeCountry(listing.country, listing.countryCode);
        if (input.countries?.length) {
          const countryMatch = input.countries
            .map((country) => this.normalizeCountry(country).name)
            .includes(normalized.name);
          if (!countryMatch) return null;
        }

        const price = Number(listing.price || 0);
        if (!price) return null;

        if (input.minPrice && price < Number(input.minPrice)) return null;
        if (input.maxPrice && price > Number(input.maxPrice)) return null;

        const threshold = countryLuxuryThreshold.get(listing.countryCode) || 0;
        const isLuxury = price >= threshold;
        if (!isLuxury) return null;

        const offMarketHint =
          listing.status !== 'ACTIVE' || !listing.isVerified || listing.mlsSource === 'MANUAL';

        const demandRatio = Number(listing.inquiryCount || 0) / Math.max(1, Number(listing.viewCount || 0));
        const freshnessDays = Math.max(
          1,
          (Date.now() - new Date(listing.createdAt).getTime()) / (1000 * 60 * 60 * 24),
        );

        const score =
          (offMarketHint ? 35 : 10) +
          Math.min(25, demandRatio * 200) +
          Math.min(20, 300 / freshnessDays) +
          (listing.status === 'PENDING' || listing.status === 'WITHDRAWN' ? 10 : 0);

        return {
          listingId: listing.id,
          title: listing.title,
          city: listing.city,
          state: listing.state,
          country: normalized.name,
          countryCode: normalized.code,
          price,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms ? Number(listing.bathrooms) : null,
          sqft: listing.sqft,
          propertyType: listing.propertyType,
          listingType: listing.listingType,
          status: listing.status,
          offMarketSignal: offMarketHint,
          demandRatio: Number(demandRatio.toFixed(3)),
          dealScore: Number(score.toFixed(2)),
          images: listing.images,
        };
      })
      .flatMap((item) => (item ? [item] : []))
      .sort((first, second) => second.dealScore - first.dealScore)
      .slice(0, limit);

    return {
      generatedAt: new Date().toISOString(),
      criteria: {
        countries: input.countries || null,
        minPrice: input.minPrice || null,
        maxPrice: input.maxPrice || null,
        minBedrooms: input.minBedrooms || null,
        propertyTypes: input.propertyTypes || null,
      },
      deals,
    };
  }

  private normalizeCountry(country?: string, countryCode?: string): { name: string; code: string } {
    const codeCandidate = (countryCode || '').trim().toUpperCase();
    const nameCandidate = (country || '').trim().toUpperCase();

    if (codeCandidate && this.countryAliasToCanonical[codeCandidate]) {
      return this.countryAliasToCanonical[codeCandidate];
    }

    if (nameCandidate && this.countryAliasToCanonical[nameCandidate]) {
      return this.countryAliasToCanonical[nameCandidate];
    }

    const fallbackName = (country || 'Unknown').trim();
    const fallbackCode = codeCandidate || this.deriveCountryCodeFallback(fallbackName);

    return {
      name: fallbackName,
      code: fallbackCode,
    };
  }

  private deriveCountryCodeFallback(countryName: string): string {
    const collapsed = countryName.replace(/[^A-Za-z]/g, '').toUpperCase();
    if (collapsed.length >= 2) return collapsed.slice(0, 2);
    return 'XX';
  }

  private async getUsdFxMap(): Promise<Record<string, number>> {
    const fallback: Record<string, number> = {
      USD: 1,
      EUR: 1.08,
      GBP: 1.27,
      AUD: 0.65,
      CAD: 0.73,
      JPY: 0.0066,
      CNY: 0.14,
      INR: 0.012,
    };

    if (!this.exchangeRatesApiKey) return fallback;

    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/' + this.exchangeRatesApiKey + '/latest/USD', {
        timeout: 5000,
      });

      const rates = response.data?.conversion_rates;
      if (!rates || typeof rates !== 'object') return fallback;

      const normalized: Record<string, number> = { ...fallback };
      for (const code of Object.keys(fallback)) {
        const usdToLocal = Number(rates[code]);
        if (Number.isFinite(usdToLocal) && usdToLocal > 0) {
          normalized[code] = 1 / usdToLocal;
        }
      }

      return normalized;
    } catch {
      return fallback;
    }
  }
}
