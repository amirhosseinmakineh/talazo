import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./application/services/authService";
import { AuthController } from "./controllers/auth.controller";
import { User } from "./domain/entities/user";
import { UserRepository } from "./Infra/Repositories/userRepository";
import { DateService } from "../../../utilities/dateService";
import { TokenService } from "../auth/application/services/tokenService";
import { PasswordService } from "../../../src/shared/security/passwordService";
import { Role } from "./domain/entities/role";
import { RolePermission } from './domain/entities/rolePermission';
import { permission } from "process";
import { Permission } from "./domain/entities/permission";

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role,RolePermission,Permission,]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "dev_secret_change_me",
      signOptions: { expiresIn: "15m" },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    { provide: "IAuthService", useExisting: AuthService },

    DateService,
    TokenService,
    PasswordService,

    UserRepository,
    { provide: "IUserRepository", useExisting: UserRepository },
  ],

  exports: ["IAuthService"],
})
export class AuthModule {}
