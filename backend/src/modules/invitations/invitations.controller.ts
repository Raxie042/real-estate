import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateInvitationApplicationDto } from './dto/create-invitation-application.dto';
import { InvitationStatusDto, UpdateInvitationStatusDto } from './dto/update-invitation-status.dto';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('apply')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async apply(@Body() body: CreateInvitationApplicationDto) {
    return this.invitationsService.createApplication(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getApplications(
    @Query('status') status?: InvitationStatusDto,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Request() req?: any,
  ) {
    const isAdmin = req?.user?.role === 'PLATFORM_ADMIN' || req?.user?.role === 'ADMIN';
    if (!isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return this.invitationsService.listApplications({ status, page, limit });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateInvitationStatusDto,
    @Request() req: any,
  ) {
    const isAdmin = req?.user?.role === 'PLATFORM_ADMIN' || req?.user?.role === 'ADMIN';
    if (!isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return this.invitationsService.updateApplicationStatus(
      id,
      body.status,
      req.user.id,
      body.adminNotes,
    );
  }
}
