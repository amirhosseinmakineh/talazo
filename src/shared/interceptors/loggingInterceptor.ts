import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable, tap, catchError, throwError } from "rxjs";
import { Reflector } from "@nestjs/core";
import { LOG_KEY } from "../decorators/log.decorator";
import { DateService } from "../../../utilities/dateService";
import { SystemLogService } from "../logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: SystemLogService,
    private readonly dateService: DateService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const hasLog = this.reflector.getAllAndOverride<boolean>(LOG_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!hasLog) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    req.traceId ??= `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    const traceId = req.traceId;
    const action = `${context.getClass().name}.${context.getHandler().name}`;
    const start = Date.now();

    this.logger.log({
      traceId,
      action,
      stage: "start",
      status: "in_progress",
      at: this.dateService.convertTimestampToPersian(start),
      userId: req.user?.userId ?? null,
    });

    return next.handle().pipe(
      tap((data) => {
        const end = Date.now();
        const statusCode = res?.statusCode;
        const tookMs = end - start;

        const success = !(
          data &&
          typeof data === "object" &&
          "success" in data &&
          (data as { success?: boolean }).success === false
        );

        this.logger.log({
          traceId,
          action,
          stage: "end",
          status: success ? "success" : "warning",
          statusCode,
          tookMs,
          userId: req.user?.userId ?? null,
          at: this.dateService.convertTimestampToPersian(end),
        });
      }),
      catchError((err) => {
        const end = Date.now();
        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error({
          traceId,
          action,
          stage: "error",
          status: "failed",
          statusCode,
          tookMs: end - start,
          userId: req.user?.userId ?? null,
          message: err?.message ?? "Unknown error",
          at: this.dateService.convertTimestampToPersian(end),
        });

        return throwError(() => err);
      }),
    );
  }
}
