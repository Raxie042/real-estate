import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AGENCY_ADMIN_ROLES } from '../auth/constants/roles.constants';
import { WhiteLabelService } from './white-label.service';

@Controller('white-label')
export class WhiteLabelController {
  constructor(private readonly whiteLabelService: WhiteLabelService) {}

  @Get('public')
  async getPublic(@Query('agencyId') agencyId?: string) {
    return this.whiteLabelService.getPublicConfig(agencyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Get('admin')
  async getAdmin(@Query('agencyId') agencyId?: string) {
    return this.whiteLabelService.getAdminConfig(agencyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...AGENCY_ADMIN_ROLES)
  @Post('admin')
  async updateAdmin(
    @Body()
    payload: {
      brandName?: string;
      logoUrl?: string;
      primaryColor?: string;
      accentColor?: string;
      supportEmail?: string;
      customDomain?: string;
      agencyId?: string;
    },
  ) {
    const { agencyId, ...rest } = payload;
    return this.whiteLabelService.updateConfig(rest, agencyId);
  }
}
