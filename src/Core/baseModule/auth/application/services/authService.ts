import { Inject, Injectable, Logger } from "@nestjs/common";
import { Result } from "../../../../../shared/patterns/result";
import { IAuthService } from "../../../contracts/iAuthService";
import { RegisterRequest } from "../../../requests/auth/registerRequest";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { User } from "../../domain/entities/user";
import { UserStatus } from "../../domain/entities/userStatus";
import { DateService } from "../../../../../../utilities/dateService";
import { HttpStatusCode } from "../../../../../../utilities/httpStatusCode";
import { TokenService } from "../services/tokenService";
import { PasswordService } from "../../../../../shared/security/passwordService";
import { LoginRequest } from "../../../requests/auth/loginRequest";
import { LoginResponse } from "../../../responses/auth/loginResponse";
import { ForgotPasswordResponse } from "../../../responses/auth/forgotPasswordResponse";
import {
  Registerresponse,
  ResetPasswordResponse,
} from "../../../responses/auth/resetPasswordResponse";
import { ChangePasswordRequest } from "../../../requests/auth/changePasswordRequest";
import { AuthMessages } from "../../config/auth.message";
import { LogMethod } from "../../../../../shared/decorators/log.decorator";

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject("IUserRepository")
    private readonly repository: IUserRepository,
    private readonly dateService: DateService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(request: RegisterRequest): Promise<Result<Registerresponse>> {
    const existingUser = await this.repository.getByUserName(
      request.userName as any,
    );
    if (existingUser) {
      return Result.failure(AuthMessages.USER_EXISTS, HttpStatusCode.CONFLICT);
    }

    const user = Object.assign(new User(), {
      username: request.userName,
      mobileNumber: request.mobileNumber,
      passwordHash: await this.passwordService.hashPassword(request.password),
      userStatus: UserStatus.ACTIVE,
      isDeleted: false,
      createdAt: this.dateService.convertTimestampToPersian(Date.now()),
      updatedAt: null,
      deletedAt: null,
    });

    var result: Registerresponse = {
      userName: user.username,
      mobileNumber: user.mobileNumber,
      userStatuse: user.userStatus,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    await this.repository.createEntity(user);

    return Result.success(
      result,
      AuthMessages.REGISTRATION_SUCCESS,
      HttpStatusCode.OK,
    );
  }

  async login(request: LoginRequest): Promise<Result<LoginResponse>> {
    if (!request.mobileNumber || !request.password) {
      return Result.failure(
        AuthMessages.INVALID_CREDENTIALS,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const user = await this.repository.getUserByMobileNumber(
      request.mobileNumber,
    );
    if (!user) {
      return Result.failure(
        AuthMessages.INVALID_CREDENTIALS,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const passOk = await this.passwordService.verifyPassword(
      user.passwordHash,
      request.password,
    );
    if (!passOk) {
      return Result.failure(
        AuthMessages.INVALID_CREDENTIALS,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const accessToken = await this.tokenService.signAccessToken(user);
    const refreshToken = await this.tokenService.signRefreshToken(user);

    const result: LoginResponse = {
      id: user.id,
      username: user.username,
      mobileNumber: user.mobileNumber,
      accessToken,
      refreshToken,
    };

    return Result.success(result, AuthMessages.AUTH_SUCCESS, HttpStatusCode.OK);
  }

  async forgotPassword(
    mobileNumber: string,
  ): Promise<Result<ForgotPasswordResponse>> {
    const user = await this.repository.getUserByMobileNumber(mobileNumber);
    if (!user) {
      return Result.failure(AuthMessages.USER_NOT_FOUND);
    }

    const resetToken = this.tokenService.generateResetToken();

    await this.repository.updateEntity(
      { id: user.id } as any,
      {
        passwordResetTokenHash: this.tokenService.hash(resetToken),
        passwordResetExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
        updatedAt: this.dateService.convertTimestampToPersian(Date.now()),
      } as any,
    );

    const response: ForgotPasswordResponse = {
      resetPasswordToken: resetToken,
      expiresInMinutes: 15,
    };

    return Result.success(
      response,
      AuthMessages.PASSWORD_RESET_TOKEN_GENERATED,
      HttpStatusCode.OK,
    );
  }

  async changePassword(
    request: ChangePasswordRequest,
  ): Promise<Result<ResetPasswordResponse>> {
    const hashResetPassword = this.tokenService.hash(
      request.resetPasswordToken,
    );
    const user = await this.tryFindUserByResetTokenHash(hashResetPassword);

    if (!user) {
      return Result.failure(
        AuthMessages.INVALID_TOKEN,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const checkPassword = await this.passwordService.verifyPassword(
      user.passwordHash,
      request.oldPassword,
    );

    if (!checkPassword) {
      return Result.failure(
        AuthMessages.OLD_PASSWORD_INCORRECT,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    await this.repository.updateEntity(
      { id: user.id } as any,
      {
        passwordHash: await this.passwordService.hashPassword(
          request.newPassword,
        ),
        updatedAt: this.dateService.convertTimestampToPersian(Date.now()),
      } as any,
    );

    const resetPasswordResponse: ResetPasswordResponse = {
      resetPasswordToken: request.resetPasswordToken,
      newPassword: request.newPassword,
      userId: user.id,
    };

    return Result.success(
      resetPasswordResponse,
      AuthMessages.PASSWORD_CHANGED,
      HttpStatusCode.OK,
    );
  }

  private async tryFindUserByResetTokenHash(
    _hash: string,
  ): Promise<User | null> {
    var user = await this.repository.getUserByResetToken(_hash);
    return user;
  }
}
