import { Controller, Get, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() data: any) {
    // Strip fields that must never be user-controlled to prevent privilege escalation
    const { id, role, email, emailVerified, passwordHash, googleId, appleId, linkedinId, microsoftId, createdAt, updatedAt, agencyId, ...safeData } = data;
    void id; void role; void email; void emailVerified; void passwordHash;
    void googleId; void appleId; void linkedinId; void microsoftId;
    void createdAt; void updatedAt; void agencyId;
    return this.usersService.update(req.user.id, safeData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteAccount(@Request() req) {
    return this.usersService.delete(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
