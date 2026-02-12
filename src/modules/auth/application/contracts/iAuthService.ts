import { Result } from "../../../../shared/patterns/result";
import { RegisterRequest } from "./requests/registerRequest";
import { LoginRequest } from "./requests/loginRequest";
import { LoginResponse } from "./responses/loginResponse";
import { Registerresponse, ResetPasswordResponse } from "./responses/resetPasswordResponse";
import { ForgotPasswordResponse } from "./responses/forgotPasswordResponse";
import { ChangePasswordRequest } from "./requests/changePasswordRequest";

export interface IAuthService {
  register(request: RegisterRequest): Promise<Result<Registerresponse>>;
  login(request: LoginRequest): Promise<Result<LoginResponse>>;
  forgotPassword(email: string): Promise<Result<ForgotPasswordResponse>>;
  changePassword( request : ChangePasswordRequest): Promise<Result<ResetPasswordResponse>>
}
