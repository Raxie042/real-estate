import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @Post()
  async addFavorite(@Request() req, @Body() body: { listingId: string; notes?: string }) {
    return this.favoritesService.addFavorite(req.user.id, body.listingId, body.notes);
  }

  @Delete(':listingId')
  async removeFavorite(@Request() req, @Param('listingId') listingId: string) {
    return this.favoritesService.removeFavorite(req.user.id, listingId);
  }

  @Get('check/:listingId')
  async isFavorite(@Request() req, @Param('listingId') listingId: string) {
    const isFavorite = await this.favoritesService.isFavorite(req.user.id, listingId);
    return { isFavorite };
  }
}
