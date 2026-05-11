import { ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MicrosoftAuthGuard extends AuthGuard('microsoft') {
  canActivate(context: ExecutionContext) {
    const hasConfig =
      !!process.env.MICROSOFT_CLIENT_ID && !!process.env.MICROSOFT_CLIENT_SECRET;

    if (!hasConfig) {
      throw new ServiceUnavailableException('Microsoft OAuth is not configured');
    }

    return super.canActivate(context);
  }
}
