import {
  ForbiddenException,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { ListingReportStatus } from '@prisma/client';
import { ListingsService } from './listings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PLATFORM_ADMIN_ROLES } from '../auth/constants/roles.constants';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../../common/services/email.service';
import { CRMService } from '../../common/services/crm.service';

@Controller('listings')
export class ListingsController {
  constructor(
    private listingsService: ListingsService,
    private notificationsService: NotificationsService,
    private emailService: EmailService,
    private crmService: CRMService,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    const rawNeighborhoods = query.neighborhoods;
    const neighborhoods = Array.isArray(rawNeighborhoods)
      ? rawNeighborhoods
          .flatMap((value: string) => value.split(','))
          .map((value: string) => value.trim())
          .filter(Boolean)
      : typeof rawNeighborhoods === 'string'
        ? rawNeighborhoods
            .split(',')
            .map((value: string) => value.trim())
            .filter(Boolean)
        : undefined;

    return this.listingsService.findAll({
      page: parseInt(query.page) || 1,
      limit: parseInt(query.limit) || 20,
      status: query.status,
      listingType: query.listingType,
      propertyType: query.propertyType,
      propertySubType: query.propertySubType,
      city: query.city,
      state: query.state,
      country: query.country,
      neighborhoods,
      minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
      minBedrooms: query.minBedrooms ? parseInt(query.minBedrooms) : undefined,
      minBathrooms: query.minBathrooms ? parseFloat(query.minBathrooms) : undefined,
      sort: query.sort || 'newest',
      search: query.search,
    });
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard)
  async getMyListings(@Request() req, @Query() query: any) {
    return this.listingsService.findByUserId(req.user.id, {
      page: parseInt(query.page) || 1,
      limit: parseInt(query.limit) || 20,
      status: query.status,
    });
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getListingStats(@Request() req) {
    return this.listingsService.getListingStats(req.user.id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.listingsService.findBySlug(slug);
  }

  @Get('admin/reports/queue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PLATFORM_ADMIN_ROLES)
  async getReportsQueue(@Query() query: any) {

    const status = (query.status || 'PENDING').toUpperCase() as ListingReportStatus;

    return this.listingsService.getReportsQueue({
      status,
      page: parseInt(query.page) || 1,
      limit: parseInt(query.limit) || 20,
    });
  }

  @Post('admin/reports/:reportId/review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PLATFORM_ADMIN_ROLES)
  async reviewReport(
    @Param('reportId') reportId: string,
    @Request() req,
    @Body()
    data: {
      decision: 'RESOLVED' | 'REJECTED';
      notes?: string;
      markListingVerified?: boolean;
      suspendListing?: boolean;
    },
  ) {
    if (!['RESOLVED', 'REJECTED'].includes(data.decision)) {
      throw new BadRequestException('Decision must be RESOLVED or REJECTED');
    }

    return this.listingsService.reviewListingReport(reportId, req.user.id, data);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Get(':id/analytics')
  @UseGuards(JwtAuthGuard)
  async getListingAnalytics(
    @Param('id') id: string,
    @Request() req,
    @Query('timeRange') timeRange?: string,
  ) {
    return this.listingsService.getListingAnalytics(id, req.user.id, timeRange || '30d');
  }

  @Post(':id/report')
  @UseGuards(JwtAuthGuard)
  async reportListing(
    @Param('id') id: string,
    @Request() req,
    @Body() data: { reason: string; details?: string },
  ) {
    if (!data.reason?.trim()) {
      throw new BadRequestException('Report reason is required');
    }

    return this.listingsService.reportListing(id, req.user.id, {
      reason: data.reason.trim(),
      details: data.details,
    });
  }

  @Put(':id/verification')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...PLATFORM_ADMIN_ROLES)
  async setListingVerification(
    @Param('id') id: string,
    @Request() req,
    @Body() data: { isVerified: boolean },
  ) {
    if (typeof data.isVerified !== 'boolean') {
      throw new BadRequestException('isVerified must be a boolean');
    }

    return this.listingsService.setListingVerification(id, req.user.id, data.isVerified);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() data: any) {
    if (!data.title || !data.price) {
      throw new BadRequestException('Title and price are required');
    }
    return this.listingsService.create(req.user.id, data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.listingsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') id: string, @Request() req) {
    await this.listingsService.delete(id, req.user.id);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publish(@Param('id') id: string, @Request() req) {
    return this.listingsService.publish(id, req.user.id);
  }

  @Post(':id/unpublish')
  @UseGuards(JwtAuthGuard)
  async unpublish(@Param('id') id: string, @Request() req) {
    return this.listingsService.unpublish(id, req.user.id);
  }

  @Post(':id/contact')
  async contactSeller(
    @Param('id') id: string,
    @Body() contactData: { name: string; email: string; phone?: string; message: string },
  ) {
    const listing = await this.listingsService.findById(id);

    if (!listing) {
      throw new BadRequestException('Listing not found');
    }

    // Increment inquiry count
    await this.listingsService.incrementInquiryCount(id);

    // Send notification to listing owner
    await this.notificationsService.sendNotification(
      listing.userId,
      'MESSAGE',
      'New Property Inquiry',
      `${contactData.name} is interested in "${listing.title}"`,
      {
        listingId: id,
        listingTitle: listing.title,
        inquirerName: contactData.name,
        inquirerEmail: contactData.email,
        inquirerPhone: contactData.phone,
        message: contactData.message,
      },
    );

    // Send email notification
    if (listing.user?.email) {
      await this.emailService.sendPropertyInquiry({
        recipientEmail: listing.user.email,
        recipientName: listing.user.firstName || 'Property Owner',
        inquirerName: contactData.name,
        inquirerEmail: contactData.email,
        inquirerPhone: contactData.phone,
        propertyTitle: listing.title,
        propertyId: id,
        message: contactData.message,
      });
    }

    await this.crmService.routeLeadFromInquiry({
      listingId: id,
      inquirerName: contactData.name,
      inquirerEmail: contactData.email,
      message: contactData.message,
      slaHours: 2,
    });

    return {
      success: true,
      message: 'Your inquiry has been sent to the seller',
    };
  }
}
