import { Module } from '@nestjs/common';
import { NeighborhoodController } from './neighborhood.controller';
import { NeighborhoodService } from './neighborhood.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NeighborhoodController],
  providers: [NeighborhoodService],
  exports: [NeighborhoodService],
})
export class NeighborhoodModule {}
