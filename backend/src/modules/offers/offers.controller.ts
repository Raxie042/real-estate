import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Throttle } from '@nestjs/throttler';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  async createOffer(@Body() body: CreateOfferDto, @Request() req) {
    return this.offersService.createOffer({
      ...body,
      buyerId: req.user.id,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    });
  }

  @Get('listing/:listingId')
  async getListingOffers(@Param('listingId') listingId: string) {
    return this.offersService.getOffersByListing(listingId);
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  async getMyOffers(@Request() req) {
    return this.offersService.getOffersByBuyer(req.user.id);
  }

  @Get('buyer/:buyerId')
  @UseGuards(JwtAuthGuard)
  async getBuyerOffers(@Param('buyerId') buyerId: string, @Request() req) {
    const isAdmin = req.user?.role === 'ADMIN';
    if (!isAdmin && req.user?.id !== buyerId) {
      throw new ForbiddenException('Not authorized to access these offers');
    }
    return this.offersService.getOffersByBuyer(buyerId);
  }

  @Get('listing/:listingId/stats')
  async getOfferStats(@Param('listingId') listingId: string) {
    return this.offersService.getOfferStats(listingId);
  }

  @Get(':id')
  async getOffer(@Param('id') id: string) {
    return this.offersService.getOfferById(id);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 40, ttl: 60_000 } })
  async updateOfferStatus(@Param('id') id: string, @Body() body: UpdateOfferStatusDto) {
    return this.offersService.updateOfferStatus(
      id,
      body.status,
      body.counterAmount,
      body.counterMessage,
    );
  }

  @Put(':id/accept')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 40, ttl: 60_000 } })
  async acceptOffer(@Param('id') id: string) {
    return this.offersService.updateOfferStatus(id, 'ACCEPTED');
  }

  @Put(':id/reject')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 40, ttl: 60_000 } })
  async rejectOffer(@Param('id') id: string, @Body() body: { message?: string }) {
    return this.offersService.updateOfferStatus(id, 'REJECTED', undefined, body?.message);
  }

  @Put(':id/counter')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 40, ttl: 60_000 } })
  async counterOffer(
    @Param('id') id: string,
    @Body() body: { counterAmount?: number; counterMessage?: string },
  ) {
    return this.offersService.updateOfferStatus(
      id,
      'COUNTERED',
      body?.counterAmount,
      body?.counterMessage,
    );
  }

  @Put(':id/withdraw')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  async withdrawOffer(@Param('id') id: string, @Request() req) {
    return this.offersService.withdrawOffer(id, req.user.id);
  }
}
