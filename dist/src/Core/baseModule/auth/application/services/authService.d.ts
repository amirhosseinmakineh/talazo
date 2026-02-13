import { Result } from "../../../../../shared/patterns/result";
import { IAuthService } from "../../contracts/iAuthService";
import { RegisterRequest } from "../../requests/auth/registerRequest";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { DateService } from "../../../../../../utilities/dateService";
import { TokenService } from "../services/tokenService";
import { PasswordService } from "../../../../../shared/security/passwordService";
import { LoginRequest } from "../../requests/auth/loginRequest";
import { LoginResponse } from "../../responses/auth/loginResponse";
import { ForgotPasswordResponse } from "../../responses/auth/forgotPasswordResponse";
import { Registerresponse, ResetPasswordResponse } from "../../responses/auth/resetPasswordResponse";
import { ChangePasswordRequest } from "../../requests/auth/changePasswordRequest";
export declare class AuthService implements IAuthService {
    private readonly repository;
    private readonly dateService;
    private readonly tokenService;
    private readonly passwordService;
    private readonly logger;
    constructor(repository: IUserRepository, dateService: DateService, tokenService: TokenService, passwordService: PasswordService);
    register(request: RegisterRequest): Promise<Result<Registerresponse>>;
    login(request: LoginRequest): Promise<Result<LoginResponse>>;
    forgotPassword(mobileNumber: string): Promise<Result<ForgotPasswordResponse>>;
    changePassword(request: ChangePasswordRequest): Promise<Result<ResetPasswordResponse>>;
    private tryFindUserByResetTokenHash;
}
