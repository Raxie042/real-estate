import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import AppleStrategy from 'passport-apple';

function decodeJwtPayload(token?: string): Record<string, unknown> {
  if (!token) return {};

  const parts = token.split('.');
  if (parts.length < 2) return {};

  try {
    const payload = Buffer.from(parts[1], 'base64').toString('utf8');
    return JSON.parse(payload);
  } catch {
    return {};
  }
}

@Injectable()
export class AppleOauthStrategy extends PassportStrategy(AppleStrategy as any, 'apple') {
  constructor(private configService: ConfigService) {
    const backendUrl = configService.get<string>('BACKEND_URL', 'http://localhost:4000');
    const privateKey =
      (configService.get<string>('APPLE_PRIVATE_KEY') ||
        '-----BEGIN PRIVATE KEY-----\\nnot-configured\\n-----END PRIVATE KEY-----').replace(
        /\\n/g,
        '\n',
      );
    const clientId = configService.get<string>('APPLE_CLIENT_ID') || 'apple-client-id-not-configured';
    const teamId = configService.get<string>('APPLE_TEAM_ID') || 'APPLE_TEAM_ID_NOT_SET';
    const keyId = configService.get<string>('APPLE_KEY_ID') || 'APPLE_KEY_ID_NOT_SET';

    super({
      clientID: clientId,
      teamID: teamId,
      keyID: keyId,
      privateKeyString: privateKey,
      callbackURL: `${backendUrl}/api/auth/apple/callback`,
      scope: ['name', 'email'],
      passReqToCallback: false,
    } as any);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    idToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ): Promise<void> {
    const tokenPayload = decodeJwtPayload(idToken);
    const email = profile?.email || (tokenPayload.email as string | undefined);
    const providerId = (tokenPayload.sub as string | undefined) || profile?.id;

    const user = {
      provider: 'apple',
      providerId,
      email,
      firstName: profile?.name?.firstName,
      lastName: profile?.name?.lastName,
    };

    done(null, user);
  }
}
