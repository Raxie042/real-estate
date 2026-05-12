import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SavedSearchesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(userId: string, data: any) {
    return this.prisma.savedSearch.create({
      data: {
        userId,
        name: data.name,
        filters: data.criteria || {},
        frequency: data.frequency || 'DAILY',
        isActive: data.notificationsEnabled || false,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string, userId: string) {
    const search = await this.prisma.savedSearch.findFirst({
      where: { id, userId },
    });

    if (!search) {
      throw new Error('Saved search not found');
    }

    return this.prisma.savedSearch.delete({
      where: { id },
    });
  }

  async toggleNotifications(id: string, userId: string) {
    const search = await this.prisma.savedSearch.findFirst({
      where: { id, userId },
    });

    if (!search) {
      throw new Error('Saved search not found');
    }

    return this.prisma.savedSearch.update({
      where: { id },
      data: { isActive: !search.isActive },
    });
  }

  /**
   * Called whenever a new listing is published.
   * Finds all active saved searches whose filters match the listing
   * and sends an in-app notification to each subscriber.
   */
  async notifyMatchingSavedSearches(listing: {
    id: string;
    title: string;
    price?: any;
    city?: string;
    state?: string;
    propertyType?: string;
    listingType?: string;
    bedrooms?: number;
  }): Promise<void> {
    const activeSavedSearches = await this.prisma.savedSearch.findMany({
      where: { isActive: true },
      include: { user: { select: { id: true, email: true, firstName: true } } },
    });

    const matches = activeSavedSearches.filter((ss) => {
      const f: any = ss.filters ?? {};
      if (f.city && listing.city && !listing.city.toLowerCase().includes(f.city.toLowerCase())) return false;
      if (f.listingType && listing.listingType && f.listingType !== listing.listingType) return false;
      if (f.propertyType && listing.propertyType && f.propertyType !== listing.propertyType) return false;
      if (f.minBedrooms && listing.bedrooms && listing.bedrooms < Number(f.minBedrooms)) return false;
      if (f.minPrice && listing.price && Number(listing.price) < Number(f.minPrice)) return false;
      if (f.maxPrice && listing.price && Number(listing.price) > Number(f.maxPrice)) return false;
      return true;
    });

    await Promise.all(
      matches.map((ss) =>
        this.notifications.sendNotification(
          ss.userId,
          'SYSTEM',
          'New matching property',
          `A new property matching your saved search "${ss.name}" has been listed: ${listing.title}`,
          { listingId: listing.id, savedSearchId: ss.id },
        ),
      ),
    );
  }
}
