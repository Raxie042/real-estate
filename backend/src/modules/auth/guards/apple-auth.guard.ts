import { ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppleAuthGuard extends AuthGuard('apple') {
	canActivate(context: ExecutionContext) {
		const hasAppleOAuthConfig =
			!!process.env.APPLE_CLIENT_ID &&
			!!process.env.APPLE_TEAM_ID &&
			!!process.env.APPLE_KEY_ID &&
			!!process.env.APPLE_PRIVATE_KEY;

		if (!hasAppleOAuthConfig) {
			throw new ServiceUnavailableException('Apple OAuth is not configured');
		}

		return super.canActivate(context);
	}
}
