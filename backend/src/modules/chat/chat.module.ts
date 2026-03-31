import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from '../../database/database.module';
import { NotificationService } from '../../common/services/notification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
    {
      provide: NotificationService,
      useClass: NotificationService,
    },
  ],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
