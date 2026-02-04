"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const loggingInterceptor_1 = require("./interceptors/loggingInterceptor");
const logger_service_1 = require("./logger/logger.service");
const dateService_1 = require("../../utilities/dateService");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            logger_service_1.SystemLogService,
            dateService_1.DateService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: loggingInterceptor_1.LoggingInterceptor,
            },
        ],
        exports: [
            logger_service_1.SystemLogService,
        ],
    })
], SharedModule);
//# sourceMappingURL=shared.Module.js.map