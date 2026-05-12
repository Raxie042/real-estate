import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AppleOauthStrategy } from './strategies/apple.strategy';
import { LinkedinStrategy } from './strategies/linkedin.strategy';
import { MicrosoftOauthStrategy } from './strategies/microsoft.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { LinkedinAuthGuard } from './guards/linkedin-auth.guard';
import { MicrosoftAuthGuard } from './guards/microsoft-auth.guard';
import { UsersModule } from '../users/users.module';

const hasLinkedinOAuthConfig =
  !!process.env.LINKEDIN_CLIENT_ID && !!process.env.LINKEDIN_CLIENT_SECRET;
const hasGoogleOAuthConfig =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
const hasMicrosoftOAuthConfig =
  !!process.env.MICROSOFT_CLIENT_ID && !!process.env.MICROSOFT_CLIENT_SECRET;
const hasAppleOAuthConfig =
  !!process.env.APPLE_CLIENT_ID &&
  !!process.env.APPLE_TEAM_ID &&
  !!process.env.APPLE_KEY_ID &&
  !!process.env.APPLE_PRIVATE_KEY;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') ?? (() => { throw new Error('JWT_SECRET environment variable is required but not set'); })(),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d') as StringValue,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ...(hasGoogleOAuthConfig ? [GoogleStrategy] : []),
    ...(hasAppleOAuthConfig ? [AppleOauthStrategy] : []),
    ...(hasLinkedinOAuthConfig ? [LinkedinStrategy] : []),
    ...(hasMicrosoftOAuthConfig ? [MicrosoftOauthStrategy] : []),
    GoogleAuthGuard,
    AppleAuthGuard,
    LinkedinAuthGuard,
    MicrosoftAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
