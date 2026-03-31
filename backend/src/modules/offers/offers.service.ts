import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Currency, OfferStatus } from '@prisma/client';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async createOffer(data: {
    listingId: string;
    buyerId: string;
    amount: number;
    currency?: string;
    message?: string;
    conditions?: any;
    expiresAt?: Date;
  }) {
    const normalizedCurrency = data.currency
      ? (data.currency.toUpperCase() as Currency)
      : undefined;

    return this.prisma.offer.create({
      data: {
        ...data,
        currency: normalizedCurrency,
        status: 'PENDING',
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            addressLine1: true,
            addressLine2: true,
            city: true,
            state: true,
            price: true,
            currency: true,
          },
        },
        buyer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
  }

  async getOffersByListing(listingId: string) {
    return this.prisma.offer.findMany({
      where: { listingId },
      include: {
        buyer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOffersByBuyer(buyerId: string) {
    return this.prisma.offer.findMany({
      where: { buyerId },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            addressLine1: true,
            addressLine2: true,
            city: true,
            state: true,
            images: true,
            price: true,
            currency: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOfferById(id: string) {
    return this.prisma.offer.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
  }

  async updateOfferStatus(
    id: string,
    status: OfferStatus,
    counterAmount?: number,
    counterMessage?: string,
  ) {
    const data: any = {
      status,
      respondedAt: new Date(),
    };

    if (counterAmount) {
      data.counterAmount = counterAmount;
    }

    if (counterMessage) {
      data.counterMessage = counterMessage;
    }

    return this.prisma.offer.update({
      where: { id },
      data,
      include: {
        listing: true,
        buyer: true,
      },
    });
  }

  async withdrawOffer(id: string, buyerId: string) {
    // Verify buyer owns this offer
    const offer = await this.prisma.offer.findFirst({
      where: { id, buyerId },
    });

    if (!offer) {
      throw new Error('Offer not found or unauthorized');
    }

    if (offer.status !== 'PENDING' && offer.status !== 'COUNTERED') {
      throw new Error('Can only withdraw pending or countered offers');
    }

    return this.prisma.offer.update({
      where: { id },
      data: { status: 'WITHDRAWN' },
    });
  }

  async expireOldOffers() {
    const now = new Date();

    return this.prisma.offer.updateMany({
      where: {
        status: { in: ['PENDING', 'COUNTERED'] },
        expiresAt: { lte: now },
      },
      data: { status: 'EXPIRED' },
    });
  }

  async getOfferStats(listingId: string) {
    const offers = await this.prisma.offer.findMany({
      where: { listingId },
      select: { amount: true, status: true },
    });

    const stats = {
      total: offers.length,
      pending: offers.filter((o) => o.status === 'PENDING').length,
      accepted: offers.filter((o) => o.status === 'ACCEPTED').length,
      rejected: offers.filter((o) => o.status === 'REJECTED').length,
      highestOffer: offers.length > 0 ? Math.max(...offers.map((o) => Number(o.amount))) : 0,
      averageOffer:
        offers.length > 0
          ? offers.reduce((sum, o) => sum + Number(o.amount), 0) / offers.length
          : 0,
    };

    return stats;
  }
}
