import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PLATFORM_ADMIN_ROLES } from '../auth/constants/roles.constants';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('performance')
  @Roles(...PLATFORM_ADMIN_ROLES)
  async getPerformance() {
    return this.analyticsService.getPlatformPerformance();
  }

  @Get('dashboard')
  async getDashboard(@Request() req) {
    return this.analyticsService.getUserAnalytics(req.user.id);
  }
}
