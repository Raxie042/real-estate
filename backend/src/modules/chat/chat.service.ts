import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChatRoom(listingId: string, participants: string[]) {
    // Check if room already exists for these participants
    const existingRoom = await this.prisma.chatRoom.findFirst({
      where: {
        listingId,
        participants: { hasEvery: participants },
      },
    });

    if (existingRoom) {
      return existingRoom;
    }

    return this.prisma.chatRoom.create({
      data: {
        listingId,
        participants,
      },
    });
  }

  async getRoomsByUser(userId: string) {
    return this.prisma.chatRoom.findMany({
      where: {
        participants: { has: userId },
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            images: true,
            price: true,
            currency: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getRoomWithMessages(roomId: string, userId: string) {
    const room = await this.prisma.chatRoom.findFirst({
      where: {
        id: roomId,
        participants: { has: userId },
      },
      include: {
        listing: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return room;
  }

  async sendMessage(roomId: string, senderId: string, content: string, attachments?: any[]) {
    // Verify sender is participant
    const room = await this.prisma.chatRoom.findFirst({
      where: {
        id: roomId,
        participants: { has: senderId },
      },
    });

    if (!room) {
      throw new Error('Room not found or user not authorized');
    }

    const message = await this.prisma.chatMessage.create({
      data: {
        roomId,
        senderId,
        content,
        attachments: attachments === undefined ? undefined : (attachments ?? Prisma.JsonNull),
      },
    });

    // Update room timestamp
    await this.prisma.chatRoom.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async markMessagesAsRead(roomId: string, userId: string) {
    return this.prisma.chatMessage.updateMany({
      where: {
        roomId,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(userId: string) {
    const rooms = await this.prisma.chatRoom.findMany({
      where: {
        participants: { has: userId },
      },
      select: { id: true },
    });

    const roomIds = rooms.map((r) => r.id);

    return this.prisma.chatMessage.count({
      where: {
        roomId: { in: roomIds },
        senderId: { not: userId },
        isRead: false,
      },
    });
  }
}
