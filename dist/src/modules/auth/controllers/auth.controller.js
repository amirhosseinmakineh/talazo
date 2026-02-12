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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const registerRequest_1 = require("../application/contracts/requests/registerRequest");
const loginRequest_1 = require("../application/contracts/requests/loginRequest");
const changePasswordRequest_1 = require("../application/contracts/requests/changePasswordRequest");
const log_decorator_1 = require("../../../shared/decorators/log.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(request) {
        debugger;
        var result = this.authService.register(request);
    }
    async login(request, res) {
        const result = await this.authService.login(request);
        res.cookie('refresh_token', result.data?.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return {
            id: result.data?.id,
            username: result.data?.username,
            mobileNumber: result.data?.mobileNumber,
            accessToken: result.data?.accessToken,
        };
    }
    forgotPassword(mobileNumber) {
        return this.authService.forgotPassword(mobileNumber);
    }
    changePassword(request) {
        debugger;
        return this.authService.changePassword(request);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, log_decorator_1.LogMethod)(),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerRequest_1.RegisterRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginRequest_1.LoginRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                mobileNumber: {
                    type: 'string',
                    example: '09123456789',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('mobileNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("change-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePasswordRequest_1.ChangePasswordRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)("IAuthService")),
    __metadata("design:paramtypes", [Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map