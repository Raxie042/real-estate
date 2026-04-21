import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MlsService } from './mls.service';
import { MlsController } from './mls.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MlsController],
  providers: [MlsService],
  exports: [MlsService],
})
export class MlsModule {}
