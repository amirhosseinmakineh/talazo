import { Body, Controller, Post, Inject, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IAuthService } from "../contracts/iAuth.Service";
import { RegisterRequest } from "../requests/auth/registerRequest";
import { LoginRequest } from "../requests/auth/loginRequest";
import { ChangePasswordRequest } from "../requests/auth/changePasswordRequest";
import { LogMethod } from "../../../../shared/decorators/log.decorator";
import { ForgotPasswordRequest } from "../requests/auth/forgotPasswordRequest";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("IAuthService")
    private readonly authService: IAuthService,
  ) {}

  @LogMethod()
  @Post("register")
  register(@Body() request: RegisterRequest) {
    return this.authService.register(request);
  }

  @Post("login")
  async login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(request);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refresh_token", result.data?.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      id: result.data?.id,
      username: result.data?.username,
      mobileNumber: result.data?.mobileNumber,
      accessToken: result.data?.accessToken,
    };
  }

  @Post("forgot-password")
  forgotPassword(@Body() request: ForgotPasswordRequest) {
    return this.authService.forgotPassword(request.mobileNumber);
  }

  @Post("change-password")
  changePassword(@Body() request: ChangePasswordRequest) {
    return this.authService.changePassword(request);
  }
}
