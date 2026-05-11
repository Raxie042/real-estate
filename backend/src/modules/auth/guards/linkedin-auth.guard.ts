import { ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedinAuthGuard extends AuthGuard('linkedin') {
  canActivate(context: ExecutionContext) {
    const hasConfig =
      !!process.env.LINKEDIN_CLIENT_ID && !!process.env.LINKEDIN_CLIENT_SECRET;

    if (!hasConfig) {
      throw new ServiceUnavailableException('LinkedIn OAuth is not configured');
    }

    return super.canActivate(context);
  }
}
