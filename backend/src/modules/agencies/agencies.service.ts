import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AgenciesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.agency.findMany({
      where: { deletedAt: null },
      include: {
        agents: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.agency.findUnique({
      where: { id },
      include: {
        agents: true,
        listings: {
          where: { status: 'ACTIVE' },
          take: 10,
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.agency.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.agency.update({
      where: { id },
      data,
    });
  }

  async getReviews(agencyId: string) {
    // Get all agents from this agency
    const agency = await this.prisma.agency.findUnique({
      where: { id: agencyId },
      include: {
        agents: {
          select: { id: true },
        },
      },
    });

    if (!agency) {
      return { reviews: [], stats: { average: 0, count: 0, distribution: {} } };
    }

    const agentIds = agency.agents.map((agent) => agent.id);

    // Get reviews for all agents in the agency
    const reviews = await this.prisma.review.findMany({
      where: {
        agentId: { in: agentIds },
      },
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics
    const count = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = count > 0 ? sum / count : 0;

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    return {
      reviews,
      stats: {
        average,
        count,
        distribution,
      },
    };
  }
}
