import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';

// Modules
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ListingsModule } from './modules/listings/listings.module';
import { SearchModule } from './modules/search/search.module';
import { AgenciesModule } from './modules/agencies/agencies.module';
import { MlsModule } from './modules/mls/mls.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { EmailModule } from './common/services/email.module';
import { ChatModule } from './modules/chat/chat.module';
import { OpenHousesModule } from './modules/open-houses/open-houses.module';
import { OffersModule } from './modules/offers/offers.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShareModule } from './modules/share/share.module';
import { NeighborhoodModule } from './modules/neighborhood/neighborhood.module';
import { ValuationModule } from './modules/valuation/valuation.module';
import { CrmModule } from './modules/crm/crm.module';
import { RentalModule } from './modules/rental/rental.module';
import { AIModule } from './modules/ai/ai.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { WhiteLabelModule } from './modules/white-label/white-label.module';

@Module({
  controllers: [AppController],
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Caching (in-memory for now)
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes default
    }),

    // Database
    DatabaseModule,

    // Common services
    EmailModule,

    // Feature modules
    AuthModule,
    UsersModule,
    ListingsModule,
    SearchModule,
    AgenciesModule,
    MlsModule,
    FavoritesModule,
    NotificationsModule,
    AnalyticsModule,
    ChatModule,
    OpenHousesModule,
    OffersModule,
    DocumentsModule,
    PaymentsModule,
    ShareModule,
    NeighborhoodModule,
    ValuationModule,
    CrmModule,
    RentalModule,
    AIModule,
    ReviewsModule,
    InvitationsModule,
    WhiteLabelModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
