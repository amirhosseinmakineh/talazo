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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const result_1 = require("../../../../../shared/patterns/result");
const user_1 = require("../../domain/entities/user");
const userStatus_1 = require("../../domain/entities/userStatus");
const dateService_1 = require("../../../../../../utilities/dateService");
const httpStatusCode_1 = require("../../../../../../utilities/httpStatusCode");
const tokenService_1 = require("../services/tokenService");
const passwordService_1 = require("../../../../../shared/security/passwordService");
const auth_message_1 = require("../../config/auth.message");
let AuthService = AuthService_1 = class AuthService {
    constructor(repository, dateService, tokenService, passwordService) {
        this.repository = repository;
        this.dateService = dateService;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(request) {
        const existingUser = await this.repository.getByUserName(request.userName);
        if (existingUser) {
            return result_1.Result.failure(auth_message_1.AuthMessages.USER_EXISTS, httpStatusCode_1.HttpStatusCode.CONFLICT);
        }
        const user = Object.assign(new user_1.User(), {
            username: request.userName,
            mobileNumber: request.mobileNumber,
            passwordHash: await this.passwordService.hashPassword(request.password),
            userStatus: userStatus_1.UserStatus.ACTIVE,
            isDeleted: false,
            createdAt: this.dateService.convertTimestampToPersian(Date.now()),
            updatedAt: null,
            deletedAt: null,
        });
        var result = {
            userName: user.username,
            mobileNumber: user.mobileNumber,
            userStatuse: user.userStatus,
            isDeleted: user.isDeleted,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
        };
        await this.repository.createEntity(user);
        return result_1.Result.success(result, auth_message_1.AuthMessages.REGISTRATION_SUCCESS, httpStatusCode_1.HttpStatusCode.OK);
    }
    async login(request) {
        if (!request.mobileNumber || !request.password) {
            return result_1.Result.failure(auth_message_1.AuthMessages.INVALID_CREDENTIALS, httpStatusCode_1.HttpStatusCode.BAD_REQUEST);
        }
        const user = await this.repository.getUserByMobileNumber(request.mobileNumber);
        if (!user) {
            return result_1.Result.failure(auth_message_1.AuthMessages.INVALID_CREDENTIALS, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        const passOk = await this.passwordService.verifyPassword(user.passwordHash, request.password);
        if (!passOk) {
            return result_1.Result.failure(auth_message_1.AuthMessages.INVALID_CREDENTIALS, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        const accessToken = await this.tokenService.signAccessToken(user);
        const refreshToken = await this.tokenService.signRefreshToken(user);
        const result = {
            id: user.id,
            username: user.username,
            mobileNumber: user.mobileNumber,
            accessToken,
            refreshToken,
        };
        return result_1.Result.success(result, auth_message_1.AuthMessages.AUTH_SUCCESS, httpStatusCode_1.HttpStatusCode.OK);
    }
    async forgotPassword(mobileNumber) {
        const user = await this.repository.getUserByMobileNumber(mobileNumber);
        if (!user) {
            return result_1.Result.failure(auth_message_1.AuthMessages.USER_NOT_FOUND);
        }
        const resetToken = this.tokenService.generateResetToken();
        await this.repository.updateEntity({ id: user.id }, {
            passwordResetTokenHash: this.tokenService.hash(resetToken),
            passwordResetExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            updatedAt: this.dateService.convertTimestampToPersian(Date.now()),
        });
        const response = {
            resetPasswordToken: resetToken,
            expiresInMinutes: 15,
        };
        return result_1.Result.success(response, auth_message_1.AuthMessages.PASSWORD_RESET_TOKEN_GENERATED, httpStatusCode_1.HttpStatusCode.OK);
    }
    async changePassword(request) {
        const hashResetPassword = this.tokenService.hash(request.resetPasswordToken);
        const user = await this.tryFindUserByResetTokenHash(hashResetPassword);
        if (!user) {
            return result_1.Result.failure(auth_message_1.AuthMessages.INVALID_TOKEN, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        const checkPassword = await this.passwordService.verifyPassword(user.passwordHash, request.oldPassword);
        if (!checkPassword) {
            return result_1.Result.failure(auth_message_1.AuthMessages.OLD_PASSWORD_INCORRECT, httpStatusCode_1.HttpStatusCode.UNAUTHORIZED);
        }
        await this.repository.updateEntity({ id: user.id }, {
            passwordHash: await this.passwordService.hashPassword(request.newPassword),
            updatedAt: this.dateService.convertTimestampToPersian(Date.now()),
        });
        const resetPasswordResponse = {
            resetPasswordToken: request.resetPasswordToken,
            newPassword: request.newPassword,
            userId: user.id,
        };
        return result_1.Result.success(resetPasswordResponse, auth_message_1.AuthMessages.PASSWORD_CHANGED, httpStatusCode_1.HttpStatusCode.OK);
    }
    async tryFindUserByResetTokenHash(_hash) {
        var user = await this.repository.getUserByResetToken(_hash);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object, dateService_1.DateService,
        tokenService_1.TokenService,
        passwordService_1.PasswordService])
], AuthService);
//# sourceMappingURL=authService.js.map