import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: any) {
    return this.agenciesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.agenciesService.update(id, data);
  }
}
