import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ValuationService } from './valuation.service';

@Controller('valuation')
export class ValuationController {
  constructor(private valuationService: ValuationService) {}

  @Post('estimate')
  async estimateValue(
    @Body()
    propertyData: {
      bedrooms: number;
      bathrooms: number;
      squareFeet: number;
      lotSize?: number;
      yearBuilt?: number;
      propertyType: string;
      city: string;
      state: string;
      zipCode?: string;
      latitude: number;
      longitude: number;
    },
  ) {
    return this.valuationService.estimateValue(propertyData);
  }

  @Get('market-trends')
  async getMarketTrends(
    @Query('city') city: string,
    @Query('state') state: string,
    @Query('months') months?: string,
  ) {
    return this.valuationService.getMarketTrends(city, state, months ? parseInt(months) : 12);
  }
}
