import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DateService } from '../../../utilities/dateService';
import { SystemLogService } from '../logger/logger.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly logger;
    private readonly dateService;
    constructor(reflector: Reflector, logger: SystemLogService, dateService: DateService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
}
