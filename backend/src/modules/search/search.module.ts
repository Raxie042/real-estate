import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SavedSearchesService } from './saved-searches.service';
import { SavedSearchesController } from './saved-searches.controller';
import { SitemapService } from './sitemap.service';

@Module({
  controllers: [SearchController, SavedSearchesController],
  providers: [SearchService, SavedSearchesService, SitemapService],
  exports: [SearchService, SavedSearchesService, SitemapService],
})
export class SearchModule {}
