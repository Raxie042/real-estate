import {
  Body,
  Controller,
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PLATFORM_ADMIN_ROLES } from '../auth/constants/roles.constants';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PLATFORM_ADMIN_ROLES)
  async getApplications(
    @Query('status') status?: InvitationStatusDto,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.invitationsService.listApplications({ status, page, limit });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PLATFORM_ADMIN_ROLES)
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateInvitationStatusDto,
    @Request() req: any,
  ) {
    return this.invitationsService.updateApplicationStatus(
      id,
      body.status,
      req.user.id,
      body.adminNotes,
    );
  }
}
