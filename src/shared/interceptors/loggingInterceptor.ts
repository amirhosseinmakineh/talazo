import { Injectable, ExecutionContext, CallHandler, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('LoggingInterceptor');

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    
    const logEnabled = this.reflector.get<boolean>('log', handler);

    if (logEnabled) {
      const className = context.getClass().name;
      const methodName = handler.name;
      const args = context.getArgs();
      this.logger.log(`در حال فراخوانی متد ${methodName} در کلاس ${className}`);
      this.logger.log(`آرگومان‌ها: ${JSON.stringify(args)}`);
    }

    return next.handle();
  }
}
