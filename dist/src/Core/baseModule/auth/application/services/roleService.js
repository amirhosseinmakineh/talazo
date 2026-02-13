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
exports.RoleService = void 0;
const dateService_1 = require("utilities/dateService");
const result_1 = require("../../../../../shared/patterns/result");
const common_1 = require("@nestjs/common");
const role_1 = require("../../domain/entities/role");
const httpStatusCode_1 = require("utilities/httpStatusCode");
let RoleService = class RoleService {
    constructor(repository, userRepository, dateService) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.dateService = dateService;
    }
    async getAllRoles(cursor, limit) {
        var roles = await this.repository.getAll();
        var sortedRoles = roles.sort((a, b) => a.id.localeCompare(b.id));
        var startIndex = 0;
        if (cursor) {
            var index = sortedRoles.findIndex((r) => r.id === cursor);
            startIndex = index >= 0 ? index + 1 : 0;
        }
        var sliced = sortedRoles.slice(startIndex, startIndex + limit);
        var hasNextPage = startIndex + limit < sortedRoles.length;
        var nextCursor = hasNextPage ? sliced[sliced.length - 1].id : undefined;
        var result = {
            items: sliced.map((r) => ({
                id: r.id,
                userId: r.userId,
                roleName: r.roleName,
            })),
            nextCursor,
            hasNextPage,
            totalCount: sortedRoles.length,
        };
        return result_1.Result.success(result);
    }
    async createRole(request) {
        var date = new Date();
        var role = Object.assign(new role_1.Role(), {
            userId: request.userId,
            roleName: request.roleName,
            createdAt: this.dateService.convertTimestampToPersian(date.getTime()),
            updatedAt: null,
            deletedAt: null,
            isDeleted: false,
        });
        var createdRole = await this.repository.createEntity(role);
        return result_1.Result.success(createdRole.id, "کاربر با موفقیت به سیستم اضافه شد", httpStatusCode_1.HttpStatusCode.CREATED);
    }
    async updateRole(request) {
        var role = await this.repository.getById(request.roleId);
        if (!role) {
            return result_1.Result.failure("نقش وجود ندارد", httpStatusCode_1.HttpStatusCode.NOT_FOUND);
        }
        var now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.updateEntity({ id: request.roleId }, {
            roleName: request.roleName,
            updatedAt: now,
        });
        return result_1.Result.success(request.roleId, "نقش با موفقیت آپدیت شد", httpStatusCode_1.HttpStatusCode.CREATED);
    }
    async deleteRole(roleId) {
        if (!roleId) {
            throw new Error("roleId is required");
        }
        var role = await this.repository.getById(roleId);
        if (!role) {
            throw new Error("Role not found");
        }
        var now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.updateEntity({ id: roleId }, {
            isDeleted: true,
            deletedAt: now,
            updatedAt: now,
        });
    }
    async addRoleToUser(userId, roleName, moduleKey) {
        var user = await this.userRepository.getById(userId);
        if (!user) {
            return result_1.Result.failure("کاربر یافت نشد");
        }
        var roles = this.repository.createQueryBuilder("role");
        roles.where("role.userId = :userId", { userId });
        roles.andWhere("role.roleName = :roleName", { roleName });
        roles.andWhere("role.isDeleted = :isDeleted", { isDeleted: false });
        if (moduleKey) {
            roles.andWhere("role.moduleKey = :moduleKey", { moduleKey });
        }
        else {
            roles.andWhere("role.moduleKey IS NULL");
        }
        var existRole = await roles.getOne();
        if (existRole) {
            return result_1.Result.failure("این نقش قبلا ثبت شده است", httpStatusCode_1.HttpStatusCode.CONFLICT);
        }
        var now = this.dateService.convertTimestampToPersian(Date.now());
        var role = Object.assign(new role_1.Role(), {
            userId: userId,
            roleName: roleName,
            moduleKey: moduleKey ?? null,
            createdAt: now,
            updatedAt: null,
            deletedAt: null,
            isDeleted: false,
        });
        var created = await this.repository.createEntity(role);
        return result_1.Result.success(created.id, "نقش برای کاربر ثبت شد", httpStatusCode_1.HttpStatusCode.CREATED);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IRoleRepository")),
    __param(1, (0, common_1.Inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object, Object, dateService_1.DateService])
], RoleService);
//# sourceMappingURL=roleService.js.map