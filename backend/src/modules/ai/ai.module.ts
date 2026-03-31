import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AIService } from '../../common/services/ai.service';
import { AIController } from './ai.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AIService],
  controllers: [AIController],
  exports: [AIService],
})
export class AIModule {}
