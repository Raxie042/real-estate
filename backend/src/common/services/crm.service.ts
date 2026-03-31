import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface LeadScore {
  totalScore: number;
  engagementScore: number;
  buyingIntentScore: number;
  responseTimeScore: number;
  profiles: {
    hotLead: boolean;
    warmLead: boolean;
    coldLead: boolean;
  };
}

@Injectable()
export class CRMService {
  constructor(private prisma: PrismaService) {}

  async routeLeadFromInquiry(data: {
    listingId: string;
    inquirerName: string;
    inquirerEmail: string;
    message: string;
    inquirerUserId?: string;
    slaHours?: number;
  }) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: data.listingId },
      include: {
        agency: {
          include: {
            agents: {
              where: { role: { in: ['AGENT', 'AGENCY_ADMIN'] } },
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    if (!listing) {
      throw new Error('Listing not found');
    }

    const candidateAgents = listing.agency?.agents?.length
      ? listing.agency.agents
      : [listing.user].filter(Boolean);

    let assignedAgent = candidateAgents[0] || null;

    if (candidateAgents.length > 1) {
      const workloads = await this.prisma.task.groupBy({
        by: ['agentId'],
        where: {
          agentId: { in: candidateAgents.map((agent) => agent.id) },
          status: { in: ['PENDING', 'IN_PROGRESS'] },
        },
        _count: { _all: true },
      });

      const workloadMap = new Map(workloads.map((item) => [item.agentId, item._count._all]));
      assignedAgent = candidateAgents
        .slice()
        .sort((firstAgent, secondAgent) => {
          const firstCount = workloadMap.get(firstAgent.id) || 0;
          const secondCount = workloadMap.get(secondAgent.id) || 0;
          return firstCount - secondCount;
        })[0];
    }

    const slaHours = data.slaHours ?? 2;
    const dueDate = new Date(Date.now() + slaHours * 60 * 60 * 1000);

    const task = await this.prisma.task.create({
      data: {
        agentId: assignedAgent?.id,
        relatedUserId: data.inquirerUserId,
        title: `Lead follow-up: ${listing.title}`,
        description: `Lead inquiry from ${data.inquirerName} (${data.inquirerEmail}). Message: ${data.message}`,
        status: 'PENDING',
        priority: 'HIGH',
        dueDate,
      },
    });

    if (data.inquirerUserId) {
      await this.prisma.interaction.create({
        data: {
          userId: data.inquirerUserId,
          type: 'INQUIRY',
          description: `Inquiry submitted for ${listing.title}`,
          relatedListingId: listing.id,
          metadata: {
            inquirerName: data.inquirerName,
            inquirerEmail: data.inquirerEmail,
            routedAgentId: assignedAgent?.id,
          },
        },
      });
    }

    return {
      task,
      assignment: {
        agentId: assignedAgent?.id || null,
        agentName: assignedAgent
          ? `${assignedAgent.firstName || ''} ${assignedAgent.lastName || ''}`.trim() || null
          : null,
        strategy: candidateAgents.length > 1 ? 'LOWEST_OPEN_TASKS' : 'LISTING_OWNER',
      },
      sla: {
        dueDate,
        hours: slaHours,
      },
    };
  }

  async calculateLeadScore(userId: string): Promise<LeadScore> {
    // Fetch user activity metrics
    const [userProfile, offers, favorites, listings] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { createdAt: true, updatedAt: true },
      }),
      this.prisma.offer.count({ where: { buyerId: userId } }),
      this.prisma.favorite.count({ where: { userId } }),
      this.prisma.listing.count({ where: { userId } }),
    ]);

    if (!userProfile) {
      return {
        totalScore: 0,
        engagementScore: 0,
        buyingIntentScore: 0,
        responseTimeScore: 0,
        profiles: { hotLead: false, warmLead: false, coldLead: true },
      };
    }

    // Calculate engagement score (0-30 points)
    const engagementScore = Math.min(30, Math.floor(favorites * 2 + listings * 3));

    // Calculate buying intent score (0-40 points)
    const buyingIntentScore = Math.min(40, Math.floor(offers * 10 + favorites * 2));

    // Calculate response time score (0-20 points)
    const daysSinceLastActivity = Math.floor(
      (Date.now() - userProfile.updatedAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    const responseTimeScore =
      daysSinceLastActivity <= 7 ? 20 : daysSinceLastActivity <= 30 ? 10 : 0;

    const totalScore = engagementScore + buyingIntentScore + responseTimeScore;

    return {
      totalScore,
      engagementScore,
      buyingIntentScore,
      responseTimeScore,
      profiles: {
        hotLead: totalScore >= 60,
        warmLead: totalScore >= 30 && totalScore < 60,
        coldLead: totalScore < 30,
      },
    };
  }

  async getFollowUpSequence(userId: string) {
    const score = await this.calculateLeadScore(userId);

    if (score.profiles.hotLead) {
      return {
        sequence: 'AGGRESSIVE',
        followUps: [
          { day: 0, action: 'CALL', message: 'Urgent follow-up' },
          { day: 1, action: 'EMAIL', message: 'Personalized property matches' },
          { day: 3, action: 'CALL', message: 'Schedule showing' },
          { day: 7, action: 'EMAIL', message: 'New opportunities' },
        ],
      };
    } else if (score.profiles.warmLead) {
      return {
        sequence: 'MODERATE',
        followUps: [
          { day: 0, action: 'EMAIL', message: 'Welcome back' },
          { day: 3, action: 'EMAIL', message: 'Featured listings' },
          { day: 7, action: 'CALL', message: 'Check-in' },
          { day: 14, action: 'EMAIL', message: 'Monthly digest' },
        ],
      };
    } else {
      return {
        sequence: 'PASSIVE',
        followUps: [
          { day: 0, action: 'EMAIL', message: 'Occasional updates' },
          { day: 14, action: 'EMAIL', message: 'Newsletter' },
          { day: 30, action: 'EMAIL', message: 'Monthly digest' },
        ],
      };
    }
  }

  async generateFollowUpTasks(agentId: string) {
    // Find recent offers from this agent's listings
    const recentOffers = await this.prisma.offer.findMany({
      where: {
        listing: { userId: agentId },
      },
      include: {
        buyer: { select: { id: true, firstName: true } },
      },
      take: 20,
    });

    const tasks: Array<{
      buyerId: string;
      buyerName: string | null;
      priority: string;
      taskType: string;
      createdAt: Date;
    }> = [];

    for (const offer of recentOffers) {
      const score = await this.calculateLeadScore(offer.buyerId);
      if (score.profiles.hotLead || score.profiles.warmLead) {
        tasks.push({
          buyerId: offer.buyerId,
          buyerName: offer.buyer.firstName,
          priority: score.profiles.hotLead ? 'HIGH' : 'MEDIUM',
          taskType: score.profiles.hotLead ? 'CALL' : 'EMAIL',
          createdAt: new Date(),
        });
      }
    }

    return tasks;
  }

  async getOverdueLeadTasks(agentId?: string) {
    return this.prisma.task.findMany({
      where: {
        ...(agentId ? { agentId } : {}),
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        dueDate: { lt: new Date() },
      },
      include: {
        agent: { select: { id: true, firstName: true, lastName: true, email: true } },
        relatedUser: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getCRMMetrics(agentId: string) {
    // Get agent's interactions
    const listings = await this.prisma.listing.findMany({
      where: { userId: agentId },
      select: { id: true },
    });

    const listingIds = listings.map((l) => l.id);

    const [totalOffers, acceptedOffers, totalFavorites] = await Promise.all([
      this.prisma.offer.count({
        where: { listing: { userId: agentId } },
      }),
      this.prisma.offer.count({
        where: {
          listing: { userId: agentId },
          status: 'ACCEPTED',
        },
      }),
      this.prisma.favorite.count({
        where: { listingId: { in: listingIds } },
      }),
    ]);

    const conversions = acceptedOffers;
    const conversionRate = totalOffers > 0 ? ((conversions / totalOffers) * 100).toFixed(2) : '0';

    return {
      totalListings: listings.length,
      totalOffers,
      acceptedOffers,
      totalFavorites,
      conversions,
      conversionRate,
    };
  }
}
