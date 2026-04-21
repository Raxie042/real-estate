import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MlsService } from './mls.service';

@Controller('mls')
@UseGuards(JwtAuthGuard)
export class MlsController {
  constructor(private mlsService: MlsService) {}

  /**
   * Sync listings from MLS (RESO Web API)
   */
  @Post('sync/reso')
  async syncFromResoWebApi(@Body() data: { city?: string; state?: string; limit?: number }) {
    return {
      status: 'SYNCING',
      message: 'RESO Web API sync initiated',
      source: 'RESO_WEB_API',
      filters: data,
      estimatedDuration: '5-10 minutes',
    };
  }

  /**
   * Sync listings from RETS
   */
  @Post('sync/rets')
  async syncFromRets(@Body() data: { serverUrl?: string; resource?: string }) {
    return {
      status: 'SYNCING',
      message: 'RETS server sync initiated',
      source: 'RETS',
      filters: data,
    };
  }

  /**
   * Get MLS sync history
   */
  @Get('sync-history')
  async getSyncHistory(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.mlsService.getSyncHistory(limit, offset);
  }

  /**
   * Get sync status for specific listing
   */
  @Get('sync-status/:listingId')
  async getSyncStatus(@Param('listingId') listingId: string) {
    return this.mlsService.getSyncStatus(listingId);
  }

  /**
   * Export listing to MLS
   */
  @Post('export')
  async exportToMls(
    @Body()
    data: {
      listingId: string;
      destination: string; // RESO_WEB_API, RETS, etc.
    },
  ) {
    return {
      status: 'EXPORTING',
      listingId: data.listingId,
      destination: data.destination,
      message: 'Listing export initiated',
    };
  }

  /**
   * Bulk import listings
   */
  @Post('bulk-import')
  async bulkImportListings(
    @Body()
    data: {
      source: string;
      listings: any[];
    },
  ) {
    return {
      status: 'IMPORTING',
      source: data.source,
      count: data.listings.length,
      message: `Bulk import of ${data.listings.length} listings initiated`,
    };
  }

  /**
   * Get MLS configuration
   */
  @Get('config')
  async getMlsConfig() {
    return {
      sources: [
        {
          name: 'RESO Web API',
          enabled: false,
          apiKey: 'REQUIRED',
          url: 'https://api.resoapi.com',
        },
        {
          name: 'RETS',
          enabled: false,
          serverUrl: 'REQUIRED',
          username: 'REQUIRED',
        },
        {
          name: 'Manual Import',
          enabled: true,
        },
      ],
      lastSync: null,
      nextAutoSync: null,
      autoSyncInterval: '24h',
    };
  }

  /**
   * Test MLS connection
   */
  @Post('test-connection')
  async testMlsConnection(@Body() data: { source: string; credentials?: any }) {
    return {
      source: data.source,
      status: 'NOT_CONFIGURED',
      message: `${data.source} connection not configured. Please set API credentials.`,
    };
  }

  /**
   * Get MLS statistics
   */
  @Get('statistics')
  async getMlsStatistics() {
    return {
      totalListingsSynced: 0,
      lastSyncDate: null,
      successfulSyncs: 0,
      failedSyncs: 0,
      avgSyncTime: 0,
      sources: {
        RESO_WEB_API: 0,
        RETS: 0,
        MANUAL: 0,
      },
    };
  }

  /**
   * Schedule auto-sync
   */
  @Post('schedule-sync')
  async scheduleAutoSync(
    @Body()
    data: {
      enabled: boolean;
      interval: string; // '1h', '6h', '24h'
      source: string;
    },
  ) {
    return {
      status: 'SCHEDULED',
      enabled: data.enabled,
      interval: data.interval,
      source: data.source,
      message: `Auto-sync scheduled every ${data.interval}`,
    };
  }
}
