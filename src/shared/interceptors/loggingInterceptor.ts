import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { LOG_KEY } from '../decorators/log.decorator';
import { DateService } from 'utilities/dateService';
import { SystemLogService } from '../logger/logger.service'; 

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: SystemLogService,
    private readonly dateService: DateService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const hasLog = this.reflector.getAllAndOverride<boolean>(
      LOG_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!hasLog) return next.handle();

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    req.traceId ??= `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const traceId = req.traceId;

    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const action = `${className}.${methodName}`;

    const start = Date.now();
    const startFa = this.dateService.convertTimestampToPersian(start);

    this.logger.log(`[${traceId}] ${action} stage=start at=${startFa}`, 'LoggingInterceptor');

    return next.handle().pipe(
      tap((data) => {
        const end = Date.now();
        const tookMs = end - start;
        const endFa = this.dateService.convertTimestampToPersian(end);
        const statusCode = res?.statusCode; 

        const isResultFailure =
          data && typeof data === 'object' && 'success' in data && (data as any).success === false;

        if (isResultFailure) {
          const msg = (data as any)?.message ?? 'Result failure';
          this.logger.warn(
            `[${traceId}] ${action} stage=end WARN status=${statusCode} tookMs=${tookMs} msg="${msg}" at=${endFa}`,
            'LoggingInterceptor'
          );
          return;
        }

        if (typeof statusCode === 'number' && statusCode >= 500) {
          this.logger.error(
            `[${traceId}] ${action} stage=end ERROR status=${statusCode} tookMs=${tookMs} at=${endFa}`,
            'LoggingInterceptor'
          );
          return;
        }

        if (typeof statusCode === 'number' && statusCode >= 400) {
          this.logger.warn(
            `[${traceId}] ${action} stage=end WARN status=${statusCode} tookMs=${tookMs} at=${endFa}`,
            'LoggingInterceptor'
          );
          return;
        }

        this.logger.log(
          `[${traceId}] ${action} stage=end status=${statusCode} tookMs=${tookMs} at=${endFa}`,
          'LoggingInterceptor'
        );
      }),

      catchError((err) => {
        const end = Date.now();
        const tookMs = end - start;
        const endFa = this.dateService.convertTimestampToPersian(end);

        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errMsg = err?.message ?? 'Unknown error';

        this.logger.error(
          `[${traceId}] ${action} stage=error status=${statusCode} tookMs=${tookMs} msg="${errMsg}" at=${endFa}`,
          'LoggingInterceptor'
        );
        return throwError(() => err);
      })
    );
  }
}
