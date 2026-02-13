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
exports.Permission = void 0;
const base_Entity_1 = require("../../../../Core/domain/base.Entity");
const typeorm_1 = require("typeorm");
const rolePermission_1 = require("./rolePermission");
let Permission = class Permission extends base_Entity_1.BaseEntity {
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, unique: true }),
    __metadata("design:type", String)
], Permission.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Permission.prototype, "permissionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Permission.prototype, "moduleKey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rolePermission_1.RolePermission, (rp) => rp.permission),
    __metadata("design:type", Array)
], Permission.prototype, "rolePermissions", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)("permissions")
], Permission);
//# sourceMappingURL=permission.js.map