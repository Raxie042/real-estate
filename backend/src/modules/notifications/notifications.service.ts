import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead?: boolean;
  readAt?: Date;
  createdAt: Date;
}

@Injectable()
export class NotificationsService {
  private notifications: Map<string, Notification[]> = new Map();

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async sendNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: any,
  ): Promise<Notification> {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      type,
      title,
      message,
      data,
      isRead: false,
      createdAt: new Date(),
    };

    const key = `notifications:${userId}`;
    const existing = (await this.cacheManager.get<Notification[]>(key)) || [];
    await this.cacheManager.set(key, [...existing, notification]);

    return notification;
  }

  async getNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    const key = `notifications:${userId}`;
    const notifications = (await this.cacheManager.get<Notification[]>(key)) || [];

    if (unreadOnly) {
      return notifications.filter((n) => !n.isRead);
    }

    return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 50);
  }

  async markAsRead(id: string, userId: string): Promise<Notification | null> {
    const key = `notifications:${userId}`;
    const notifications = (await this.cacheManager.get<Notification[]>(key)) || [];

    const notification = notifications.find((n) => n.id === id);
    if (!notification) {
      return null;
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await this.cacheManager.set(key, notifications);

    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    const key = `notifications:${userId}`;
    const notifications = (await this.cacheManager.get<Notification[]>(key)) || [];

    notifications.forEach((n) => {
      if (!n.isRead) {
        n.isRead = true;
        n.readAt = new Date();
      }
    });

    await this.cacheManager.set(key, notifications);
  }
}
