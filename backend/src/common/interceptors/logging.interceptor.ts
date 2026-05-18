import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    // Skip Railway/Render health pings — they fire every 5 seconds and add noise
    if (url === '/health') return next.handle();

    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          const status = context.switchToHttp().getResponse().statusCode;
          console.log(`${method} ${url} ${status} +${ms}ms`);
        },
        error: () => {
          const ms = Date.now() - start;
          console.log(`${method} ${url} ERR +${ms}ms`);
        },
      }),
    );
  }
}
