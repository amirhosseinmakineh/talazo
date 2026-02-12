"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const result_1 = require("@modules/shared/patterns/result");
class RoleService {
    constructor(repository, dateService) {
        this.repository = repository;
        this.dateService = dateService;
    }
    async getAllRoles() {
        const roles = await this.repository.getAll();
        const response = (roles ?? []).map((r) => ({
            id: r.id,
            roleName: r.roleName,
            moduleKey: r.moduleKey ?? null,
            userId: r.userId ?? r.user?.id ?? null,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
        }));
        return result_1.Result.success(response);
    }
    async createRole(roleName) {
        if (!roleName || !roleName.trim()) {
            throw new Error("roleName is required");
        }
        const exists = await this.repository.existsByRoleName(roleName.trim());
        if (exists) {
            throw new Error("Role already exists");
        }
        const now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.createEntity({
            roleName: roleName.trim(),
            moduleKey: null,
            createdAt: now,
            updatedAt: now,
        });
    }
    async updateRole(roleId) {
        if (!roleId) {
            throw new Error("roleId is required");
        }
        const role = await this.repository.getById(roleId);
        if (!role) {
            throw new Error("Role not found");
        }
        const now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.updateEntity({ id: roleId, isDeleted: false }, {
            updatedAt: now,
        });
    }
    async deleteRole(roleId) {
        if (!roleId) {
            throw new Error("roleId is required");
        }
        const role = await this.repository.getById(roleId);
        if (!role) {
            throw new Error("Role not found");
        }
        const now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.deleteEntity({
            id: roleId,
            isDeleted: true,
            deletedAt: now,
            updatedAt: now,
        });
    }
    async addRoleToUser(userId, roleName, moduleKey) {
        if (!userId) {
            throw new Error("userId is required");
        }
        if (!roleName || !roleName.trim()) {
            throw new Error("roleName is required");
        }
        const rn = roleName.trim();
        const mk = moduleKey?.trim() ? moduleKey.trim() : null;
        const roles = await this.repository.getAll();
        const exists = (roles ?? []).some((r) => r?.isDeleted !== true &&
            String(r?.userId) === userId &&
            String(r?.roleName) === rn &&
            (r?.moduleKey ?? null) === mk);
        if (exists) {
            throw new Error("Role already exists for this user");
        }
        const now = this.dateService.convertTimestampToPersian(Date.now());
        await this.repository.createEntity({
            userId,
            roleName: rn,
            moduleKey: mk,
            isDeleted: false,
            createdAt: now,
            updatedAt: now,
        });
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=roleService.js.map