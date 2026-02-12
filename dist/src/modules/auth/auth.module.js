"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const authService_1 = require("./application/services/authService");
const auth_controller_1 = require("./controllers/auth.controller");
const user_1 = require("./domain/entities/user");
const userRepository_1 = require("./Infra/Repositories/userRepository");
const dateService_1 = require("../../../utilities/dateService");
const tokenService_1 = require("../auth/application/services/tokenService");
const passwordService_1 = require("../../../src/shared/security/passwordService");
const role_1 = require("./domain/entities/role");
const rolePermission_1 = require("./domain/entities/rolePermission");
const permission_1 = require("./domain/entities/permission");
const user_controller_1 = require("./controllers/user.controller");
const user_Service_1 = require("./application/services/user.Service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_1.User, role_1.Role, rolePermission_1.RolePermission, permission_1.Permission,]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET || "dev_secret_change_me",
                signOptions: { expiresIn: "15m" },
            }),
        ],
        controllers: [auth_controller_1.AuthController, user_controller_1.UserController],
        providers: [
            authService_1.AuthService,
            { provide: "IAuthService", useExisting: authService_1.AuthService },
            user_Service_1.UserService,
            { provide: 'IUserService', useExisting: user_Service_1.UserService },
            dateService_1.DateService,
            tokenService_1.TokenService,
            passwordService_1.PasswordService,
            userRepository_1.UserRepository,
            { provide: "IUserRepository", useExisting: userRepository_1.UserRepository },
        ],
        exports: ["IAuthService", 'IUserService'],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map