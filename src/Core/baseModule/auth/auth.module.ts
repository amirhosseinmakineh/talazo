import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./application/services/authService";
import { AuthController } from "./controllers/auth.controller";
import { User } from "./domain/entities/user";
import { UserRepository } from "../../infra/repositories/userRepository";
import { DateService } from "../../../../utilities/dateService";
import { TokenService } from "./application/services/tokenService";
import { PasswordService } from "../../../shared/security/passwordService";
import { Role } from "./domain/entities/role";
import { RolePermission } from "./domain/entities/rolePermission";
import { Permission } from "./domain/entities/permission";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./application/services/user.Service";
import { RoleController } from "./controllers/role.controller";
import { RoleService } from "./application/services/roleService";
import { RoleRepository } from "../../infra/repositories/roleRepository";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, RolePermission, Permission]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "dev_secret_change_me",
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [AuthController, UserController, RoleController],
  providers: [
    AuthService,
    { provide: "IAuthService", useExisting: AuthService },
    UserService,
    { provide: "IUserService", useExisting: UserService },
    RoleService,
    { provide: "IRoleService", useExisting: RoleService },
    DateService,
    TokenService,
    PasswordService,
    UserRepository,
    { provide: "IUserRepository", useExisting: UserRepository },
    RoleRepository,
    { provide: "IRoleRepository", useExisting: RoleRepository },
  ],
  exports: ["IAuthService", "IUserService", "IRoleService"],
})
export class AuthModule {}
