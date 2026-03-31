import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ValuationService {
  constructor(private prisma: PrismaService) {}

  async estimateValue(propertyData: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize?: number;
    yearBuilt?: number;
    propertyType: string;
    city: string;
    state: string;
    zipCode?: string;
    latitude: number;
    longitude: number;
  }) {
    // Get comparable properties
    const comparables = await this.getComparables(propertyData);

    if (comparables.length === 0) {
      return {
        estimatedValue: null,
        confidence: 'low',
        message: 'Not enough comparable properties found',
      };
    }

    // Calculate average price per square foot
    const avgPricePerSqFt =
      comparables.reduce((sum, comp) => sum + Number(comp.price) / (comp.sqft ?? 1), 0) /
      comparables.length;

    // Base estimate
    let estimatedValue = avgPricePerSqFt * propertyData.squareFeet;

    // Adjust for property age
    if (propertyData.yearBuilt) {
      const age = new Date().getFullYear() - propertyData.yearBuilt;
      const avgAge =
        comparables.reduce(
          (sum, comp) => sum + (comp.yearBuilt ? new Date().getFullYear() - comp.yearBuilt : 0),
          0,
        ) / comparables.length;

      const ageDiff = age - avgAge;
      // Depreciate 0.5% per year older, appreciate 0.5% per year newer
      estimatedValue *= 1 - ageDiff * 0.005;
    }

    // Adjust for lot size if available
    if (propertyData.lotSize && comparables.some((c) => c.lotSize)) {
      const compsWithLot = comparables.filter((c) => c.lotSize);
      const avgLotSize =
        compsWithLot.reduce((sum, comp) => sum + Number(comp.lotSize ?? 0), 0) /
        compsWithLot.length;

      const lotDiff = propertyData.lotSize - avgLotSize;
      // Add/subtract $50 per sq ft difference in lot size
      estimatedValue += lotDiff * 50;
    }

    // Calculate confidence based on number and similarity of comparables
    const confidence = this.calculateConfidence(comparables.length, propertyData, comparables);

    // Calculate value range
    const lowValue = estimatedValue * 0.9;
    const highValue = estimatedValue * 1.1;

    return {
      estimatedValue: Math.round(estimatedValue),
      lowValue: Math.round(lowValue),
      highValue: Math.round(highValue),
      confidence,
      pricePerSqFt: Math.round(avgPricePerSqFt),
      comparablesCount: comparables.length,
      comparables: comparables.map((c) => ({
        id: c.id,
        price: Number(c.price),
        bedrooms: c.bedrooms,
        bathrooms: c.bathrooms,
        squareFeet: c.sqft,
        address: c.addressLine1,
        city: c.city,
        distance: this.calculateDistance(
          propertyData.latitude,
          propertyData.longitude,
          c.latitude,
          c.longitude,
        ),
      })),
    };
  }

  private async getComparables(propertyData: any) {
    // Find similar properties within 5 miles, sold in last 12 months, similar size/features
    const radius = 5; // miles
    const monthsBack = 12;
    const dateThreshold = new Date();
    dateThreshold.setMonth(dateThreshold.getMonth() - monthsBack);

    // Get properties in the same general area
    const listings = await this.prisma.listing.findMany({
      where: {
        propertyType: propertyData.propertyType,
        city: propertyData.city,
        state: propertyData.state,
        status: 'SOLD',
        updatedAt: { gte: dateThreshold },
        bedrooms: {
          gte: Math.max(1, propertyData.bedrooms - 1),
          lte: propertyData.bedrooms + 1,
        },
        sqft: {
          gte: propertyData.squareFeet * 0.8,
          lte: propertyData.squareFeet * 1.2,
        },
      },
      select: {
        id: true,
        price: true,
        bedrooms: true,
        bathrooms: true,
        sqft: true,
        lotSize: true,
        yearBuilt: true,
        addressLine1: true,
        city: true,
        latitude: true,
        longitude: true,
      },
      take: 20,
    });

    // Filter by distance and sort by similarity
    const comparables = listings
      .map((listing) => ({
        ...listing,
        distance: this.calculateDistance(
          propertyData.latitude,
          propertyData.longitude,
          listing.latitude,
          listing.longitude,
        ),
      }))
      .filter((listing) => listing.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    return comparables;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Haversine formula
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private calculateConfidence(
    count: number,
    property: any,
    comparables: any[],
  ): 'high' | 'medium' | 'low' {
    if (count < 3) return 'low';
    if (count < 6) return 'medium';

    // Check similarity - if comparables are very similar, increase confidence
    const sqFtVariance = this.calculateVariance(comparables.map((c) => c.sqft ?? 0));
    const avgSqFt = comparables.reduce((sum, c) => sum + (c.sqft ?? 0), 0) / count;
    const coefficientOfVariation = Math.sqrt(sqFtVariance) / avgSqFt;

    if (coefficientOfVariation < 0.15) return 'high';
    if (coefficientOfVariation < 0.25) return 'medium';
    return 'low';
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  }

  async getMarketTrends(city: string, state: string, months: number = 12) {
    const dateThreshold = new Date();
    dateThreshold.setMonth(dateThreshold.getMonth() - months);

    const listings = await this.prisma.listing.findMany({
      where: {
        city,
        state,
        createdAt: { gte: dateThreshold },
      },
      select: {
        price: true,
        sqft: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Calculate average price over time
    const monthlyData = new Map<string, { totalPrice: number; count: number; totalSqFt: number }>();

    listings.forEach((listing) => {
      const monthKey = listing.createdAt.toISOString().slice(0, 7); // YYYY-MM
      const existing = monthlyData.get(monthKey) || { totalPrice: 0, count: 0, totalSqFt: 0 };

      existing.totalPrice += Number(listing.price);
      existing.totalSqFt += listing.sqft ?? 0;
      existing.count += 1;

      monthlyData.set(monthKey, existing);
    });

    const trends = Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        averagePrice: Math.round(data.totalPrice / data.count),
        pricePerSqFt: Math.round(data.totalPrice / data.totalSqFt),
        listingsCount: data.count,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      trends,
      currentAveragePrice: trends[trends.length - 1]?.averagePrice || 0,
      priceChange:
        trends.length > 1
          ? ((trends[trends.length - 1].averagePrice - trends[0].averagePrice) /
              trends[0].averagePrice) *
            100
          : 0,
    };
  }
}
