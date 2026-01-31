import { IAuthService } from "../application/contracts/iAuthService";
import { RegisterRequest } from "../application/contracts/requests/registerRequest";
import { LoginRequest } from "../application/contracts/requests/loginRequest";
import { ChangePasswordRequest } from '../application/contracts/requests/changePasswordRequest';
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    register(request: RegisterRequest): Promise<import("../../../shared/patterns/result").Result<string>>;
    login(request: LoginRequest): Promise<import("../../../shared/patterns/result").Result<import("../application/contracts/responses/loginResponse").LoginResponse>>;
    forgotPassword(mobileNumber: string): Promise<import("../../../shared/patterns/result").Result<import("../application/contracts/responses/forgotPasswordResponse").ForgotPasswordResponse>>;
    changePassword(request: ChangePasswordRequest): Promise<import("../../../shared/patterns/result").Result<import("../application/contracts/responses/resetPasswordResponse").ResetPasswordResponse>>;
}
