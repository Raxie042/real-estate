import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SavedSearchesService } from './saved-searches.service';

@Controller('saved-searches')
@UseGuards(JwtAuthGuard)
export class SavedSearchesController {
  constructor(private readonly savedSearchesService: SavedSearchesService) {}

  @Get()
  async getAll(@Request() req) {
    return this.savedSearchesService.findByUserId(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() data: any) {
    return this.savedSearchesService.create(req.user.id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.savedSearchesService.delete(id, req.user.id);
  }

  @Put(':id/toggle-notifications')
  async toggleNotifications(@Param('id') id: string, @Request() req) {
    return this.savedSearchesService.toggleNotifications(id, req.user.id);
  }
}
