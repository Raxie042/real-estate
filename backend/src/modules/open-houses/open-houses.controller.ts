import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OpenHousesService } from './open-houses.service';

@Controller('open-houses')
export class OpenHousesController {
  constructor(private openHousesService: OpenHousesService) {}

  @Post()
  async createOpenHouse(
    @Body()
    body: {
      listingId: string;
      startTime: string;
      endTime: string;
      description?: string;
      maxAttendees?: number;
    },
  ) {
    return this.openHousesService.createOpenHouse({
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    });
  }

  @Get('upcoming')
  async getUpcomingOpenHouses(@Query('limit') limit?: string) {
    return this.openHousesService.getUpcomingOpenHouses(limit ? parseInt(limit) : 20);
  }

  @Get('listing/:listingId')
  async getListingOpenHouses(@Param('listingId') listingId: string) {
    return this.openHousesService.getOpenHousesByListing(listingId);
  }

  @Get(':id')
  async getOpenHouse(@Param('id') id: string) {
    return this.openHousesService.getOpenHouseById(id);
  }

  @Put(':id')
  async updateOpenHouse(
    @Param('id') id: string,
    @Body()
    body: {
      startTime?: string;
      endTime?: string;
      description?: string;
      maxAttendees?: number;
    },
  ) {
    return this.openHousesService.updateOpenHouse(id, {
      ...body,
      startTime: body.startTime ? new Date(body.startTime) : undefined,
      endTime: body.endTime ? new Date(body.endTime) : undefined,
    });
  }

  @Delete(':id')
  async deleteOpenHouse(@Param('id') id: string) {
    return this.openHousesService.deleteOpenHouse(id);
  }

  @Post('rsvp')
  async createRSVP(
    @Body()
    body: {
      openHouseId: string;
      userId?: string;
      name: string;
      email: string;
      phone?: string;
      guests?: number;
    },
  ) {
    return this.openHousesService.createRSVP(body);
  }

  @Put('rsvp/:id/status')
  async updateRSVPStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.openHousesService.updateRSVPStatus(id, body.status);
  }

  @Delete('rsvp/:id')
  async deleteRSVP(@Param('id') id: string) {
    return this.openHousesService.deleteRSVP(id);
  }

  @Get('user/:userId/rsvps')
  async getUserRSVPs(@Param('userId') userId: string) {
    return this.openHousesService.getUserRSVPs(userId);
  }
}
