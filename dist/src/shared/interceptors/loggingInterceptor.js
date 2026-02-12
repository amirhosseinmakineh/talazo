"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const core_1 = require("@nestjs/core");
const log_decorator_1 = require("../decorators/log.decorator");
const dateService_1 = require("../../../utilities/dateService");
const logger_service_1 = require("../logger/logger.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(reflector, logger, dateService) {
        this.reflector = reflector;
        this.logger = logger;
        this.dateService = dateService;
    }
    intercept(context, next) {
        const hasLog = this.reflector.getAllAndOverride(log_decorator_1.LOG_KEY, [context.getHandler(), context.getClass()]);
        if (!hasLog)
            return next.handle();
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
        return next.handle().pipe((0, rxjs_1.tap)((data) => {
            const end = Date.now();
            const tookMs = end - start;
            const endFa = this.dateService.convertTimestampToPersian(end);
            const statusCode = res?.statusCode;
            const isResultFailure = data && typeof data === 'object' && 'success' in data && data.success === false;
            if (isResultFailure) {
                const msg = data?.message ?? 'Result failure';
                this.logger.warn(`[${traceId}] ${action} stage=end WARN status=${statusCode} tookMs=${tookMs} msg="${msg}" at=${endFa}`, 'LoggingInterceptor');
                return;
            }
            if (typeof statusCode === 'number' && statusCode >= 500) {
                this.logger.error(`[${traceId}] ${action} stage=end ERROR status=${statusCode} tookMs=${tookMs} at=${endFa}`, 'LoggingInterceptor');
                return;
            }
            if (typeof statusCode === 'number' && statusCode >= 400) {
                this.logger.warn(`[${traceId}] ${action} stage=end WARN status=${statusCode} tookMs=${tookMs} at=${endFa}`, 'LoggingInterceptor');
                return;
            }
            this.logger.log(`[${traceId}] ${action} stage=end status=${statusCode} tookMs=${tookMs} at=${endFa}`, 'LoggingInterceptor');
        }), (0, rxjs_1.catchError)((err) => {
            const end = Date.now();
            const tookMs = end - start;
            const endFa = this.dateService.convertTimestampToPersian(end);
            const statusCode = err instanceof common_1.HttpException
                ? err.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const errMsg = err?.message ?? 'Unknown error';
            this.logger.error(`[${traceId}] ${action} stage=error status=${statusCode} tookMs=${tookMs} msg="${errMsg}" at=${endFa}`, 'LoggingInterceptor');
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        logger_service_1.SystemLogService,
        dateService_1.DateService])
], LoggingInterceptor);
//# sourceMappingURL=loggingInterceptor.js.map