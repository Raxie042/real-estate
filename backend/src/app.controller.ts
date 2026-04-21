import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getApiIndex() {
    return {
      name: 'real-estate-api',
      status: 'ok',
      version: this.configService.get('API_VERSION', 'v1'),
      timestamp: new Date().toISOString(),
      health: '/health',
      basePath: `/${this.configService.get('API_PREFIX', 'api')}`,
    };
  }
}