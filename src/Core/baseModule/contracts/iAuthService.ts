import { Result } from "../../../shared/patterns/result";
import { ChangePasswordRequest } from "../requests/auth/changePasswordRequest";
import { LoginRequest } from "../requests/auth/loginRequest";
import { RegisterRequest } from "../requests/auth/registerRequest";
import { ForgotPasswordResponse } from "../responses/auth/forgotPasswordResponse";
import { LoginResponse } from "../responses/auth/loginResponse";
import {
  Registerresponse,
  ResetPasswordResponse,
} from "../responses/auth/resetPasswordResponse";

export interface IAuthService {
  register(request: RegisterRequest): Promise<Result<Registerresponse>>;
  login(request: LoginRequest): Promise<Result<LoginResponse>>;
  forgotPassword(mobileNumber: string): Promise<Result<ForgotPasswordResponse>>;
  changePassword(
    request: ChangePasswordRequest,
  ): Promise<Result<ResetPasswordResponse>>;
}
