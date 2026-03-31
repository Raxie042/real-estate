import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const backendUrl = configService.get<string>('BACKEND_URL', 'http://localhost:4000');
    const clientId = configService.get<string>('GOOGLE_CLIENT_ID') || 'google-client-id-not-configured';
    const clientSecret =
      configService.get<string>('GOOGLE_CLIENT_SECRET') || 'google-client-secret-not-configured';

    super({
      clientID: clientId,
      clientSecret,
      callbackURL: `${backendUrl}/api/auth/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const email = profile?.emails?.[0]?.value;

    const user = {
      provider: 'google',
      providerId: profile?.id,
      email,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
    };

    done(null, user);
  }
}
