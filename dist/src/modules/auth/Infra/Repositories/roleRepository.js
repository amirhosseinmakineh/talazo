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
exports.RoleRepository = void 0;
const baseRepository_1 = require("../../../../Core/infra/baseRepository");
const role_1 = require("../../domain/entities/role");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RoleRepository = class RoleRepository extends baseRepository_1.BaseRepository {
    constructor(repo) {
        super(repo);
    }
    async existsByRoleName(roleName) {
        return await this.repository.exists({ where: { roleName }
        });
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(role_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleRepository);
//# sourceMappingURL=roleRepository.js.map