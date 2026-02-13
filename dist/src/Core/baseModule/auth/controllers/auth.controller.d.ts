import { Response } from "express";
import { IAuthService } from "../contracts/iAuthService";
import { RegisterRequest } from "../requests/auth/registerRequest";
import { LoginRequest } from "../requests/auth/loginRequest";
import { ChangePasswordRequest } from "../requests/auth/changePasswordRequest";
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    register(request: RegisterRequest): Promise<import("../../../../shared/patterns/result").Result<import("../responses/auth/resetPasswordResponse").Registerresponse>>;
    login(request: LoginRequest, res: Response): Promise<{
        id: string | undefined;
        username: string | undefined;
        mobileNumber: string | undefined;
        accessToken: string | undefined;
    }>;
    forgotPassword(mobileNumber: string): Promise<import("../../../../shared/patterns/result").Result<import("../responses/auth/forgotPasswordResponse").ForgotPasswordResponse>>;
    changePassword(request: ChangePasswordRequest): Promise<import("../../../../shared/patterns/result").Result<import("../responses/auth/resetPasswordResponse").ResetPasswordResponse>>;
}
