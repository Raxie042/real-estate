import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AgenciesService {
  constructor(private prisma: PrismaService) {}

  async getTeamOverview(agencyId: string) {
    const [agency, activeListings, offers, openTasks] = await Promise.all([
      this.prisma.agency.findUnique({
        where: { id: agencyId },
        include: {
          agents: {
            where: { deletedAt: null },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              createdAt: true,
            },
          },
        },
      }),
      this.prisma.listing.count({ where: { agencyId, status: 'ACTIVE' } }),
      this.prisma.offer.count({ where: { listing: { agencyId } } }),
      this.prisma.task.count({ where: { agent: { agencyId }, status: { in: ['PENDING', 'IN_PROGRESS'] } } }),
    ]);

    return {
      agency,
      summary: {
        activeListings,
        offers,
        openTasks,
      },
    };
  }

  async getAgentMetrics(agencyId: string) {
    const agents = await this.prisma.user.findMany({
      where: {
        agencyId,
        role: { in: ['AGENT', 'AGENCY_ADMIN'] },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const results = await Promise.all(
      agents.map(async (agent) => {
        const [listings, acceptedOffers, openTasks] = await Promise.all([
          this.prisma.listing.count({ where: { userId: agent.id, deletedAt: null } }),
          this.prisma.offer.count({ where: { listing: { userId: agent.id }, status: 'ACCEPTED' } }),
          this.prisma.task.count({ where: { agentId: agent.id, status: { in: ['PENDING', 'IN_PROGRESS'] } } }),
        ]);

        return {
          ...agent,
          metrics: {
            listings,
            acceptedOffers,
            openTasks,
          },
        };
      }),
    );

    return results;
  }

  async assignListing(agencyId: string, listingId: string, agentId: string) {
    const agent = await this.prisma.user.findFirst({
      where: {
        id: agentId,
        agencyId,
        role: { in: ['AGENT', 'AGENCY_ADMIN'] },
      },
      select: { id: true },
    });

    if (!agent) {
      throw new Error('Agent not found in this agency');
    }

    return this.prisma.listing.update({
      where: { id: listingId },
      data: {
        agencyId,
        userId: agentId,
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

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
