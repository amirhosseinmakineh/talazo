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
let LoggingInterceptor = class LoggingInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger('LoggingInterceptor');
    }
    intercept(context, next) {
        const handler = context.getHandler();
        const logEnabled = this.reflector.get('log', handler);
        if (logEnabled) {
            const className = context.getClass().name;
            const methodName = handler.name;
            const args = context.getArgs();
            this.logger.log(`در حال فراخوانی متد ${methodName} در کلاس ${className}`);
            this.logger.log(`آرگومان‌ها: ${JSON.stringify(args)}`);
        }
        return next.handle();
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], LoggingInterceptor);
//# sourceMappingURL=loggingInterceptor.js.map