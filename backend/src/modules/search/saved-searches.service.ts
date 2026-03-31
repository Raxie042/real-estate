import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SavedSearchesService {
  constructor(private prisma: PrismaService) {}

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
}
