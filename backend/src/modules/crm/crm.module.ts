import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CRMService } from '../../common/services/crm.service';
import { CrmController } from './crm.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [DatabaseModule, NotificationsModule],
  providers: [CRMService],
  controllers: [CrmController],
  exports: [CRMService],
})
export class CrmModule {}
