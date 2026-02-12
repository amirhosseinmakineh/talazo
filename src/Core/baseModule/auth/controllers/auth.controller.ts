import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Inject,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IAuthService } from "../../contracts/iAuthService";
import { RegisterRequest } from "../../requests/auth/registerRequest";
import { LoginRequest } from "../../requests/auth/loginRequest";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";
import { ChangePasswordRequest } from "../../requests/auth/changePasswordRequest";
import { LogMethod } from "../../../../shared/decorators/log.decorator";

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

    res.cookie("refresh_token", result.data?.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        mobileNumber: {
          type: "string",
          example: "09123456789",
        },
      },
    },
  })
  forgotPassword(@Body("mobileNumber") mobileNumber: string) {
    return this.authService.forgotPassword(mobileNumber);
  }
  @Post("change-password")
  changePassword(@Body() request: ChangePasswordRequest) {
    return this.authService.changePassword(request);
  }
}
