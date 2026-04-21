import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { GoogleAuthGuard } from '../src/modules/auth/guards/google-auth.guard';
import { AppleAuthGuard } from '../src/modules/auth/guards/apple-auth.guard';

describe('OAuth configuration e2e', () => {
  let app: INestApplication;
  let previousEnv: Record<string, string | undefined>;

  beforeAll(async () => {
    previousEnv = {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
      APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
      APPLE_KEY_ID: process.env.APPLE_KEY_ID,
      APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
    };

    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    delete process.env.APPLE_CLIENT_ID;
    delete process.env.APPLE_TEAM_ID;
    delete process.env.APPLE_KEY_ID;
    delete process.env.APPLE_PRIVATE_KEY;

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        GoogleAuthGuard,
        AppleAuthGuard,
        {
          provide: AuthService,
          useValue: {
            socialLogin: jest.fn(),
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();

    Object.entries(previousEnv).forEach(([key, value]) => {
      if (typeof value === 'undefined') {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  });

  it('returns 503 for /auth/google when Google OAuth is not configured', async () => {
    await request(app.getHttpServer()).get('/auth/google').expect(503);
  });

  it('returns 503 for /auth/apple when Apple OAuth is not configured', async () => {
    await request(app.getHttpServer()).get('/auth/apple').expect(503);
  });
});
