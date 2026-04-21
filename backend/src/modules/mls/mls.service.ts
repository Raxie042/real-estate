import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

/**
 * MLS Integration Service
 * Handles ingestion and normalization of data from various MLS sources
 */
@Injectable()
export class MlsService {
  constructor(private prisma: PrismaService) {}

  async getSyncHistory(limit = 10, offset = 0) {
    const [syncs, total] = await Promise.all([
      this.prisma.mLSSync.findMany({
        orderBy: { lastSyncedAt: 'desc' },
        take: Number(limit),
        skip: Number(offset),
        include: { listing: { select: { id: true, title: true } } },
      }),
      this.prisma.mLSSync.count(),
    ]);
    return { syncs, total, limit, offset };
  }

  async getSyncStatus(listingId: string) {
    const sync = await this.prisma.mLSSync.findFirst({
      where: { listingId },
      orderBy: { lastSyncedAt: 'desc' },
    });
    if (!sync) return { listingId, syncStatus: 'NEVER_SYNCED', lastSyncedAt: null, lastError: null };
    return {
      listingId,
      syncStatus: sync.syncStatus,
      lastSyncedAt: sync.lastSyncedAt,
      lastError: sync.errorMessage,
    };
  }

  async recordSync(data: {
    listingId?: string;
    mlsNumber: string;
    source: string;
    syncStatus: string;
    errorMessage?: string;
  }) {
    return this.prisma.mLSSync.upsert({
      where: { mlsNumber: data.mlsNumber },
      create: {
        listingId: data.listingId,
        mlsNumber: data.mlsNumber,
        source: data.source,
        syncStatus: data.syncStatus,
        errorMessage: data.errorMessage,
      },
      update: {
        syncStatus: data.syncStatus,
        errorMessage: data.errorMessage,
        listingId: data.listingId,
      },
    });
  }

  /**
   * RESO Web API adapter
   * Fetch and normalize listings from RESO-compliant MLS
   */
  async syncResoMls(mlsId: string, credentials: any) {
    // TODO: Implement RESO Web API client
    // 1. Authenticate with MLS
    // 2. Fetch listings
    // 3. Normalize data
    // 4. Upsert to database
    console.log('Syncing RESO MLS:', mlsId, { hasCredentials: Boolean(credentials) });
  }

  /**
   * Normalize MLS data to internal schema
   */
  normalizeMLSListing(rawData: any, source: string): any {
    // TODO: Implement field mapping logic
    return {
      title: rawData.PublicRemarks || rawData.ListingTitle,
      description: rawData.PublicRemarks,
      price: rawData.ListPrice,
      bedrooms: rawData.BedroomsTotal,
      bathrooms: rawData.BathroomsTotalInteger,
      sqft: rawData.LivingArea,
      addressLine1: rawData.StreetAddress || rawData.UnparsedAddress,
      city: rawData.City,
      state: rawData.StateOrProvince,
      postalCode: rawData.PostalCode,
      country: rawData.Country || 'US',
      countryCode: rawData.Country || 'US',
      latitude: rawData.Latitude,
      longitude: rawData.Longitude,
      propertyType: this.mapPropertyType(rawData.PropertyType),
      mlsSource: source || 'RESO_WEB_API',
      mlsListingId: rawData.ListingId || rawData.ListingKey,
      mlsRawData: rawData,
    };
  }

  private mapPropertyType(mlsType: string): string {
    const mapping: Record<string, string> = {
      Residential: 'RESIDENTIAL',
      Commercial: 'COMMERCIAL',
      Land: 'LAND',
      // Add more mappings as needed
    };
    return mapping[mlsType] || 'RESIDENTIAL';
  }
}
