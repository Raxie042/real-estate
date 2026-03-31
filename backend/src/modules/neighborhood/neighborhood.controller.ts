import { Controller, Get, Query } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';

@Controller('neighborhood')
export class NeighborhoodController {
  constructor(private neighborhoodService: NeighborhoodService) {}

  @Get('insights')
  async getInsights(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.neighborhoodService.getNeighborhoodInsights(parseFloat(lat), parseFloat(lng));
  }

  @Get('places')
  async getPlaces(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('type') type: string,
  ) {
    return this.neighborhoodService.getPlacesNearby(parseFloat(lat), parseFloat(lng), type);
  }

  @Get('commute')
  async getCommute(
    @Query('fromLat') fromLat: string,
    @Query('fromLng') fromLng: string,
    @Query('toLat') toLat: string,
    @Query('toLng') toLng: string,
    @Query('mode') mode?: string,
  ) {
    return this.neighborhoodService.getCommuteTime(
      parseFloat(fromLat),
      parseFloat(fromLng),
      parseFloat(toLat),
      parseFloat(toLng),
      mode,
    );
  }
}
