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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
let RoleController = class RoleController {
    constructor(service) {
        this.service = service;
    }
    getAllRoles() {
        return this.service.getAllRoles();
    }
    createRole(roleName) {
        return this.service.createRole(roleName);
    }
    updateRole(roleId) {
        return this.service.updateRole(roleId);
    }
    deleteRole(roleId) {
        return this.service.deleteRole(roleId);
    }
    addRoleToUser(userId, roleName, moduleKey) {
        return this.service.addRoleToUser(userId, roleName, moduleKey);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)("roleName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.Put)(":roleId"),
    __param(0, (0, common_1.Param)("roleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)(":roleId"),
    __param(0, (0, common_1.Param)("roleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, common_1.Post)("assign"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("roleName")),
    __param(2, (0, common_1.Body)("moduleKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "addRoleToUser", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)("roles"),
    __metadata("design:paramtypes", [Object])
], RoleController);
//# sourceMappingURL=role.controller.js.map