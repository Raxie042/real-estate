import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OpenHousesService {
  constructor(private prisma: PrismaService) {}

  async createOpenHouse(data: {
    listingId: string;
    startTime: Date;
    endTime: Date;
    description?: string;
    maxAttendees?: number;
  }) {
    return this.prisma.openHouse.create({
      data,
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            addressLine1: true,
            addressLine2: true,
            city: true,
            state: true,
          },
        },
        rsvps: true,
      },
    });
  }

  async getOpenHousesByListing(listingId: string) {
    return this.prisma.openHouse.findMany({
      where: { listingId },
      include: {
        rsvps: {
          where: { status: 'confirmed' },
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getUpcomingOpenHouses(limit: number = 20) {
    const now = new Date();
    return this.prisma.openHouse.findMany({
      where: {
        startTime: { gte: now },
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
            images: true,
            price: true,
            currency: true,
          },
        },
        rsvps: {
          where: { status: 'confirmed' },
        },
      },
      orderBy: { startTime: 'asc' },
      take: limit,
    });
  }

  async getOpenHouseById(id: string) {
    return this.prisma.openHouse.findUnique({
      where: { id },
      include: {
        listing: true,
        rsvps: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async updateOpenHouse(
    id: string,
    data: {
      startTime?: Date;
      endTime?: Date;
      description?: string;
      maxAttendees?: number;
    },
  ) {
    return this.prisma.openHouse.update({
      where: { id },
      data,
      include: {
        rsvps: true,
      },
    });
  }

  async deleteOpenHouse(id: string) {
    return this.prisma.openHouse.delete({
      where: { id },
    });
  }

  async createRSVP(data: {
    openHouseId: string;
    userId?: string;
    name: string;
    email: string;
    phone?: string;
    guests?: number;
  }) {
    // Check if open house is full
    const openHouse = await this.prisma.openHouse.findUnique({
      where: { id: data.openHouseId },
      include: {
        rsvps: {
          where: { status: 'confirmed' },
        },
      },
    });

    if (!openHouse) {
      throw new Error('Open house not found');
    }

    const totalConfirmed = openHouse.rsvps.reduce((sum, rsvp) => sum + rsvp.guests, 0);
    const requestedSpots = data.guests || 1;

    if (openHouse.maxAttendees && totalConfirmed + requestedSpots > openHouse.maxAttendees) {
      throw new Error('Open house is full');
    }

    // Check for duplicate email
    const existing = await this.prisma.openHouseRSVP.findFirst({
      where: {
        openHouseId: data.openHouseId,
        email: data.email,
      },
    });

    if (existing) {
      throw new Error("You have already RSVP'd to this open house");
    }

    return this.prisma.openHouseRSVP.create({
      data: {
        openHouseId: data.openHouseId,
        userId: data.userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests || 1,
        status: 'confirmed',
      },
    });
  }

  async updateRSVPStatus(id: string, status: string) {
    return this.prisma.openHouseRSVP.update({
      where: { id },
      data: { status },
    });
  }

  async deleteRSVP(id: string) {
    return this.prisma.openHouseRSVP.delete({
      where: { id },
    });
  }

  async getUserRSVPs(userId: string) {
    return this.prisma.openHouseRSVP.findMany({
      where: { userId },
      include: {
        openHouse: {
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
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
