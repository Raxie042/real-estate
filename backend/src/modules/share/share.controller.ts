import { Controller, Get, Query } from '@nestjs/common';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Get('url')
  getShareUrl(
    @Query('listingId') listingId: string,
    @Query('platform') platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'email',
  ) {
    return { url: this.shareService.generateShareUrl(listingId, platform) };
  }

  @Get('links')
  getShareLinks(
    @Query('listingId') listingId: string,
    @Query('title') title: string,
    @Query('description') description: string,
  ) {
    return this.shareService.generateShareLinks(listingId, title, description);
  }

  @Get('metadata')
  getOpenGraphMetadata(@Query('listing') listingJson: string) {
    const listing = JSON.parse(listingJson);
    return this.shareService.generateOpenGraphMetadata(listing);
  }
}
