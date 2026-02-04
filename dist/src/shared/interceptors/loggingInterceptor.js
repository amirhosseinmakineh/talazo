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
const core_1 = require("@nestjs/core");
const logger_service_1 = require("../logger/logger.service");
const dateService_1 = require("../../../utilities/dateService");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(reflector, logger, dateService) {
        this.reflector = reflector;
        this.logger = logger;
        this.dateService = dateService;
    }
    intercept(context, next) {
        debugger;
        const hasLog = this.reflector.get('log', context.getHandler());
        if (!hasLog)
            return next.handle();
        const request = context.switchToHttp().getRequest();
        debugger;
        request.traceId ??= `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const traceId = request.traceId;
        const className = context.getClass().name;
        const methodName = context.getHandler().name;
        const action = `${className}.${methodName}`;
        const start = Date.now();
        const persianDate = this.dateService.convertTimestampToPersian(start);
        this.logger.log(`[${traceId}] ${action} stage=start at=${persianDate}`, 'LoggingInterceptor');
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const end = Date.now();
            this.logger.log(`[${traceId}] ${action} stage=end tookMs=${end - start} at=${this.dateService.convertTimestampToPersian(end)}`, 'LoggingInterceptor');
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