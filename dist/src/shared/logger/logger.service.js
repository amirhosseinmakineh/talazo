"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemLogService = void 0;
const common_1 = require("@nestjs/common");
let SystemLogService = class SystemLogService {
    setContext(context) {
        this.context = context;
    }
    log(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.log(`[LOG] ${context ? `[${context}]` : ''}`, message);
    }
    fatal(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.error(`[FATAL] ${context ? `[${context}]` : ''}`, message);
    }
    error(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.error(`[ERROR] ${context ? `[${context}]` : ''}`, message);
    }
    warn(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.warn(`[WARN] ${context ? `[${context}]` : ''}`, message);
    }
    debug(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.debug(`[DEBUG] ${context ? `[${context}]` : ''}`, message);
    }
    verbose(message, ...optionalParams) {
        const context = optionalParams[0] || this.context;
        console.log(`[VERBOSE] ${context ? `[${context}]` : ''}`, message);
    }
};
exports.SystemLogService = SystemLogService;
exports.SystemLogService = SystemLogService = __decorate([
    (0, common_1.Injectable)()
], SystemLogService);
//# sourceMappingURL=logger.service.js.map