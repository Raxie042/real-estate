import 'reflect-metadata';
import { CanActivate, ExecutionContext, INestApplication, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AnalyticsController } from '../src/modules/analytics/analytics.controller';
import { AnalyticsService } from '../src/modules/analytics/analytics.service';
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../src/modules/auth/guards/roles.guard';
import { WhiteLabelController } from '../src/modules/white-label/white-label.controller';
import { WhiteLabelService } from '../src/modules/white-label/white-label.service';
import { InvitationsController } from '../src/modules/invitations/invitations.controller';
import { InvitationsService } from '../src/modules/invitations/invitations.service';
import { ListingsController } from '../src/modules/listings/listings.controller';
import { ListingsService } from '../src/modules/listings/listings.service';
import { NotificationsService } from '../src/modules/notifications/notifications.service';
import { EmailService } from '../src/common/services/email.service';
import { CRMService } from '../src/common/services/crm.service';

class HeaderJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.headers['x-test-role'];

    if (!role || typeof role !== 'string') {
      throw new UnauthorizedException();
    }

    request.user = {
      id: request.headers['x-test-user-id'] || 'test-user-id',
      email: 'test@example.com',
      role,
    };

    return true;
  }
}

describe('Authorization e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        AnalyticsController,
        WhiteLabelController,
        InvitationsController,
        ListingsController,
      ],
      providers: [
        Reflector,
        {
          provide: RolesGuard,
          useFactory: (reflector: Reflector) => new RolesGuard(reflector),
          inject: [Reflector],
        },
        {
          provide: AnalyticsService,
          useValue: {
            getPlatformPerformance: jest.fn().mockResolvedValue({ ok: true }),
            getUserAnalytics: jest.fn().mockResolvedValue({ ok: true }),
          },
        },
        {
          provide: WhiteLabelService,
          useValue: {
            getPublicConfig: jest.fn().mockResolvedValue({ brandName: 'Test Brand' }),
            getAdminConfig: jest.fn().mockResolvedValue({ brandName: 'Admin Brand' }),
            updateConfig: jest.fn().mockResolvedValue({ updated: true }),
          },
        },
        {
          provide: InvitationsService,
          useValue: {
            createApplication: jest.fn(),
            listApplications: jest.fn().mockResolvedValue({ items: [], total: 0 }),
            updateApplicationStatus: jest.fn().mockResolvedValue({ updated: true }),
          },
        },
        {
          provide: ListingsService,
          useValue: {
            getReportsQueue: jest.fn().mockResolvedValue({ reports: [], total: 0 }),
            reviewListingReport: jest.fn().mockResolvedValue({ reviewed: true }),
            setListingVerification: jest.fn().mockResolvedValue({ verified: true }),
          },
        },
        {
          provide: NotificationsService,
          useValue: {
            sendNotification: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendPropertyInquiry: jest.fn(),
          },
        },
        {
          provide: CRMService,
          useValue: {
            routeLeadFromInquiry: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(HeaderJwtAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 401 for protected route without auth', async () => {
    await request(app.getHttpServer()).get('/analytics/performance').expect(401);
  });

  it('returns 403 for analytics performance with non-admin role', async () => {
    await request(app.getHttpServer())
      .get('/analytics/performance')
      .set('x-test-role', 'BUYER')
      .expect(403);
  });

  it('returns 200 for analytics performance with platform admin role', async () => {
    await request(app.getHttpServer())
      .get('/analytics/performance')
      .set('x-test-role', 'PLATFORM_ADMIN')
      .expect(200);
  });

  it('returns 403 for white-label admin with agent role', async () => {
    await request(app.getHttpServer())
      .get('/white-label/admin')
      .set('x-test-role', 'AGENT')
      .expect(403);
  });

  it('returns 200 for white-label admin with agency admin role', async () => {
    await request(app.getHttpServer())
      .get('/white-label/admin')
      .set('x-test-role', 'AGENCY_ADMIN')
      .expect(200);
  });

  it('returns 403 for invitations admin list with buyer role', async () => {
    await request(app.getHttpServer())
      .get('/invitations')
      .set('x-test-role', 'BUYER')
      .expect(403);
  });

  it('returns 200 for invitations admin list with admin role', async () => {
    await request(app.getHttpServer())
      .get('/invitations')
      .set('x-test-role', 'ADMIN')
      .expect(200);
  });

  it('returns 403 for listing admin reports queue with buyer role', async () => {
    await request(app.getHttpServer())
      .get('/listings/admin/reports/queue')
      .set('x-test-role', 'BUYER')
      .expect(403);
  });

  it('returns 200 for listing admin reports queue with platform admin role', async () => {
    await request(app.getHttpServer())
      .get('/listings/admin/reports/queue')
      .set('x-test-role', 'PLATFORM_ADMIN')
      .expect(200);
  });

  it('returns 403 for listing verification with seller role', async () => {
    await request(app.getHttpServer())
      .put('/listings/listing-1/verification')
      .set('x-test-role', 'SELLER')
      .send({ isVerified: true })
      .expect(403);
  });

  it('returns 200 for listing verification with admin role', async () => {
    await request(app.getHttpServer())
      .put('/listings/listing-1/verification')
      .set('x-test-role', 'ADMIN')
      .send({ isVerified: true })
      .expect(200);
  });

  it('returns 403 for listing report review with seller role', async () => {
    await request(app.getHttpServer())
      .post('/listings/admin/reports/report-1/review')
      .set('x-test-role', 'SELLER')
      .send({ decision: 'RESOLVED' })
      .expect(403);
  });

  it('returns 200 for listing report review with platform admin role', async () => {
    await request(app.getHttpServer())
      .post('/listings/admin/reports/report-1/review')
      .set('x-test-role', 'PLATFORM_ADMIN')
      .send({ decision: 'RESOLVED' })
      .expect(201);
  });
});
