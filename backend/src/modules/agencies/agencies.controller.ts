import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AGENCY_ADMIN_ROLES } from '../auth/constants/roles.constants';

@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Get(':id/team-overview')
  async getTeamOverview(@Param('id') id: string) {
    return this.agenciesService.getTeamOverview(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Get(':id/agent-metrics')
  async getAgentMetrics(@Param('id') id: string) {
    return this.agenciesService.getAgentMetrics(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Post(':id/assign-listing')
  async assignListing(
    @Param('id') id: string,
    @Body() data: { listingId: string; agentId: string },
  ) {
    return this.agenciesService.assignListing(id, data.listingId, data.agentId);
  }

  @Get()
  async findAll() {
    return this.agenciesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.agenciesService.findById(id);
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    return this.agenciesService.getReviews(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Post()
  async create(@Body() data: any) {
    return this.agenciesService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.agenciesService.update(id, data);
  }
}
