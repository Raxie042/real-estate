import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AIService } from '../../common/services/ai.service';

@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  /**
   * Generate AI property description
   */
  @Post('generate-description')
  async generateDescription(
    @Body()
    data: {
      title: string;
      bedrooms: number;
      bathrooms: number;
      squareFeet: number;
      yearBuilt: number;
      features: string[];
      neighborhood?: string;
    },
  ) {
    const description = await this.aiService.generatePropertyDescription(data);
    return { description };
  }

  /**
   * Get property recommendations for user
   */
  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string, @Query('limit') limit = 10) {
    const properties = await this.aiService.recommendProperties(userId, Number(limit));
    return { properties };
  }

  /**
   * Get market analysis for a city
   */
  @Get('market-analysis/:city/:state')
  async getMarketAnalysis(@Param('city') city: string, @Param('state') state: string) {
    const analysis = await this.aiService.analyzeMarket(city, state);
    return analysis;
  }

  /**
   * Predict property price
   */
  @Post('price-prediction')
  async predictPrice(
    @Body()
    data: {
      bedrooms: number;
      bathrooms: number;
      squareFeet: number;
      yearBuilt: number;
      city: string;
      state: string;
    },
  ) {
    const prediction = await this.aiService.predictPropertyPrice(data);
    return prediction;
  }

  /**
   * Get neighborhood insights
   */
  @Get('neighborhood-insights')
  async getNeighborhoodInsights(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radiusKm') radiusKm = 1,
  ) {
    const insights = await this.aiService.getNeighborhoodInsights(
      Number(latitude),
      Number(longitude),
      Number(radiusKm),
    );
    return insights;
  }
}
