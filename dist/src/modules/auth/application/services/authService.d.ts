import { Result } from "../../../../shared/patterns/result";
import { IAuthService } from "../contracts/iAuthService";
import { RegisterRequest } from "../contracts/requests/registerRequest";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { DateService } from "../../../../../utilities/dateService";
import { TokenService } from "../services/tokenService";
import { PasswordService } from "../../../../shared/security/passwordService";
import { LoginRequest } from "../contracts/requests/loginRequest";
import { LoginResponse } from "../contracts/responses/loginResponse";
import { ForgotPasswordResponse } from "../contracts/responses/forgotPasswordResponse";
import { Registerresponse, ResetPasswordResponse } from '../contracts/responses/resetPasswordResponse';
import { ChangePasswordRequest } from "../contracts/requests/changePasswordRequest";
export declare class AuthService implements IAuthService {
    private readonly repository;
    private readonly dateService;
    private readonly tokenService;
    private readonly passwordService;
    private readonly logger;
    constructor(repository: IUserRepository, dateService: DateService, tokenService: TokenService, passwordService: PasswordService);
    register(request: RegisterRequest): Promise<Result<Registerresponse>>;
    login(request: LoginRequest): Promise<Result<LoginResponse>>;
    forgotPassword(userName: string): Promise<Result<ForgotPasswordResponse>>;
    changePassword(request: ChangePasswordRequest): Promise<Result<ResetPasswordResponse>>;
    private tryFindUserByResetTokenHash;
}
