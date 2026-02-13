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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const result_1 = require("../../../../../shared/patterns/result");
const cursure_1 = require("../../../../../shared/patterns/cursure");
const dateService_1 = require("../../../../../../utilities/dateService");
const httpStatusCode_1 = require("../../../../../../utilities/httpStatusCode");
let UserService = class UserService {
    constructor(repository, dateService) {
        this.repository = repository;
        this.dateService = dateService;
    }
    async getAllUsers(cursor, limit = 10) {
        const users = await this.repository.getAll();
        const sortedUsers = users.sort((a, b) => (a.id > b.id ? 1 : -1));
        let startIndex = 0;
        if (cursor) {
            const decodedCursor = cursure_1.Cursor.decode(cursor);
            const index = sortedUsers.findIndex((u) => u.id === decodedCursor);
            startIndex = index >= 0 ? index + 1 : 0;
        }
        const sliced = sortedUsers.slice(startIndex, startIndex + limit + 1);
        const hasNextPage = sliced.length > limit;
        const pageItems = hasNextPage ? sliced.slice(0, limit) : sliced;
        const items = pageItems.map((u) => ({
            userName: u.username,
            mobileNumber: u.mobileNumber,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
            isDeleted: u.isDeleted,
            deletedAt: u.deletedAt,
        }));
        const nextCursor = hasNextPage
            ? cursure_1.Cursor.encode(pageItems[pageItems.length - 1].id)
            : undefined;
        return result_1.Result.success({
            items,
            nextCursor,
            hasNextPage,
            totalCount: users.length,
        }, "Users retrieved successfully");
    }
    async updateUser(request) {
        const user = await this.repository.getByUserName(request.userName);
        if (!user) {
            return result_1.Result.failure("کاربری یافت نشد", httpStatusCode_1.HttpStatusCode.NOT_FOUND);
        }
        const date = new Date();
        const criteria = {
            username: request.userName,
            mobileNumber: request.mobileNumber,
            updatedAt: this.dateService.convertTimestampToPersian(date.getTime()),
        };
        await this.repository.updateEntity({ id: user.id, isDeleted: false }, criteria);
        const updatedUser = await this.repository.getByUserName(request.userName);
        if (!updatedUser) {
            return result_1.Result.failure("خطا در دریافت کاربر بعد از آپدیت", httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const userName = updatedUser.username;
        if (!userName) {
            return result_1.Result.failure("نام کاربری نامعتبر است", httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        if (updatedUser.mobileNumber == null) {
            return result_1.Result.failure("شماره موبایل نامعتبر است", httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const response = {
            userName: userName,
            mobileNumber: updatedUser.mobileNumber,
            createdAt: updatedUser.createdAt ?? null,
            updatedAt: updatedUser.updatedAt ?? null,
            isDeleted: updatedUser.isDeleted,
            deletedAt: updatedUser.deletedAt ?? null,
        };
        return result_1.Result.success(response, "آپدیت کاربر با موفقیت انجام شد", httpStatusCode_1.HttpStatusCode.OK);
    }
    async deleteUser(id) {
        const user = await this.repository.getById(id);
        if (!user || user.isDeleted) {
            return result_1.Result.failure("کاربری یافت نشد", httpStatusCode_1.HttpStatusCode.NOT_FOUND);
        }
        const now = new Date();
        const nowPersian = this.dateService.convertTimestampToPersian(now.getTime());
        await this.repository.updateEntity({ id: user.id }, {
            isDeleted: true,
            deletedAt: nowPersian,
            updatedAt: nowPersian,
        });
        const deletedUser = await this.repository.getById(id);
        if (!deletedUser) {
            return result_1.Result.failure("خطا در حذف کاربر", httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        if (!deletedUser.username) {
            return result_1.Result.failure("نام کاربری نامعتبر است", httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
        const response = {
            userName: (deletedUser.username ?? deletedUser.username),
            mobileNumber: deletedUser.mobileNumber,
            createdAt: deletedUser.createdAt ?? null,
            updatedAt: deletedUser.updatedAt ?? null,
            isDeleted: deletedUser.isDeleted,
            deletedAt: deletedUser.deletedAt ?? null,
        };
        return result_1.Result.success(response, "کاربر با موفقیت حذف شد", httpStatusCode_1.HttpStatusCode.OK);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object, dateService_1.DateService])
], UserService);
//# sourceMappingURL=user.Service.js.map