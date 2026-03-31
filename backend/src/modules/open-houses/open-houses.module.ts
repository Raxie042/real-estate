import { Module } from '@nestjs/common';
import { OpenHousesController } from './open-houses.controller';
import { OpenHousesService } from './open-houses.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OpenHousesController],
  providers: [OpenHousesService],
  exports: [OpenHousesService],
})
export class OpenHousesModule {}
