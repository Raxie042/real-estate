import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Throttle } from '@nestjs/throttler';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('rooms')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  async createRoom(@Body() body: CreateRoomDto, @Request() req) {
    const participants = Array.from(new Set([...(body.participants || []), req.user.id]));
    return this.chatService.createChatRoom(body.listingId, participants);
  }

  @Get('rooms')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 120, ttl: 60_000 } })
  async getUserRooms(@Request() req) {
    return this.chatService.getRoomsByUser(req.user.id);
  }

  @Get('rooms/:roomId')
  @UseGuards(JwtAuthGuard)
  async getRoom(@Param('roomId') roomId: string, @Request() req) {
    return this.chatService.getRoomWithMessages(roomId, req.user.id);
  }

  @Get('rooms/:roomId/messages')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 150, ttl: 60_000 } })
  async getRoomMessages(@Param('roomId') roomId: string, @Request() req) {
    const room = await this.chatService.getRoomWithMessages(roomId, req.user.id);
    return room?.messages || [];
  }

  @Post('rooms/:roomId/messages')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  async sendRoomMessage(
    @Param('roomId') roomId: string,
    @Body() body: SendMessageDto,
    @Request() req,
  ) {
    return this.chatService.sendMessage(roomId, req.user.id, body.content);
  }

  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 120, ttl: 60_000 } })
  async getUnreadCount(@Request() req) {
    const count = await this.chatService.getUnreadCount(req.user.id);
    return { count };
  }
}
