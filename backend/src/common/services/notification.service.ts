import { Injectable, Inject, forwardRef, Optional } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ChatGateway } from '../../modules/chat/chat.gateway';

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    @Optional() @Inject(forwardRef(() => ChatGateway)) private chatGateway?: ChatGateway,
  ) {}

  /**
   * Send notification when new listing matches saved search
   */
  async notifyNewListingMatch(userId: string, listingId: string, searchName: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, phone: true, preferences: true },
    });

    if (!user) return;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, title: true, price: true, addressLine1: true, city: true, state: true },
    });

    if (!listing) return;

    // Create in-app notification
    await this.createInAppNotification(
      userId,
      'NEW_LISTING',
      `New listing found for "${searchName}": ${listing.title}`,
      `/properties/${listing.id}`,
    );
  }

  /**
   * Alert user of price drop
   */
  async notifyPriceDrop(userId: string, listingId: string, oldPrice: number, newPrice: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, phone: true },
    });

    if (!user) return;

    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, title: true, addressLine1: true, city: true },
    });

    if (!listing) return;

    const priceDrop = (((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);

    await this.createInAppNotification(
      userId,
      'PRICE_CHANGE',
      `Price dropped ${priceDrop}% for ${listing.title}!`,
      `/properties/${listing.id}`,
    );
  }

  /**
   * Send open house reminder
   */
  async notifyOpenHouseReminder(userId: string, openHouseId: string, listingId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, phone: true },
    });

    const openHouse = await this.prisma.openHouse.findUnique({
      where: { id: openHouseId },
      include: { listing: { select: { title: true, addressLine1: true } } },
    });

    if (user && openHouse) {
      await this.createInAppNotification(
        userId,
        'APPOINTMENT',
        `Upcoming open house: ${openHouse.listing.title}`,
        `/properties/${listingId}`,
      );
    }
  }

  /**
   * Create in-app notification
   */
  async createInAppNotification(userId: string, type: string, message: string, actionUrl?: string) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type: type as any,
        title: message,
        message,
        data: actionUrl ? { url: actionUrl } : undefined,
        isRead: false,
      },
    });
    // Emit real-time notification if gateway is available
    if (this.chatGateway && this.chatGateway.server) {
      const socketId = this.chatGateway.userSockets.get(userId);
      if (socketId) {
        this.chatGateway.server.to(socketId).emit('newNotification', notification);
      }
    }
    return notification;
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string, limit = 20) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  /**
   * Clear all notifications
   */
  async clearNotifications(userId: string) {
    return this.prisma.notification.deleteMany({
      where: { userId },
    });
  }
}
