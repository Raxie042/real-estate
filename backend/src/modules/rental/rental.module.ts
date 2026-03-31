import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { RentalManagementService } from './rental.service';
import { RentalController } from './rental.controller';

@Module({
  imports: [DatabaseModule],
  providers: [RentalManagementService],
  controllers: [RentalController],
  exports: [RentalManagementService],
})
export class RentalModule {}
