import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
// @ts-ignore – no official @types package
import MicrosoftStrategy from 'passport-microsoft';

@Injectable()
export class MicrosoftOauthStrategy extends PassportStrategy(MicrosoftStrategy, 'microsoft') {
  constructor(private configService: ConfigService) {
    const backendUrl = configService.get<string>('BACKEND_URL', 'http://localhost:4000');
    super({
      clientID: configService.get<string>('MICROSOFT_CLIENT_ID') || 'microsoft-client-id-not-configured',
      clientSecret: configService.get<string>('MICROSOFT_CLIENT_SECRET') || 'microsoft-client-secret-not-configured',
      callbackURL: `${backendUrl}/api/auth/microsoft/callback`,
      scope: ['user.read'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const email =
      profile?.emails?.[0]?.value ||
      profile?._json?.mail ||
      profile?._json?.userPrincipalName;
    const user = {
      provider: 'microsoft',
      providerId: profile?.id,
      email,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
    };
    done(null, user);
  }
}
