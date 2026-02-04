"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMethod = exports.LOG_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.LOG_KEY = 'log';
debugger;
const LogMethod = () => (0, common_1.SetMetadata)(exports.LOG_KEY, true);
exports.LogMethod = LogMethod;
//# sourceMappingURL=log.decorator.js.map