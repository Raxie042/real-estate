import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private configService: ConfigService) {
    const backendUrl = configService.get<string>('BACKEND_URL', 'http://localhost:4000');
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID') || 'linkedin-client-id-not-configured',
      clientSecret: configService.get<string>('LINKEDIN_CLIENT_SECRET') || 'linkedin-client-secret-not-configured',
      callbackURL: `${backendUrl}/api/auth/linkedin/callback`,
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const email = profile?.emails?.[0]?.value;
    const user = {
      provider: 'linkedin',
      providerId: profile?.id,
      email,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
    };
    done(null, user);
  }
}
