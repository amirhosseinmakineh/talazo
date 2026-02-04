import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SystemLogService } from "../logger/logger.service";
import { DateService } from "../../../utilities/dateService";
import { Observable } from "rxjs";
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly logger;
    private readonly dateService;
    constructor(reflector: Reflector, logger: SystemLogService, dateService: DateService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
}
