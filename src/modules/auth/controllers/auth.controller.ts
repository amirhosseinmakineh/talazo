import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Inject,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { IAuthService } from "../application/contracts/iAuthService";
import { RegisterRequest } from "../application/contracts/requests/registerRequest";
import { LoginRequest } from "../application/contracts/requests/loginRequest";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";
import { ChangePasswordRequest } from '../application/contracts/requests/changePasswordRequest';
import { LogMethod } from "../../../shared/decorators/log.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("IAuthService")
    private readonly authService: IAuthService
  ) {}
  @LogMethod()
  @Post("register")
  register(@Body() request: RegisterRequest) {
    debugger;
    return this.authService.register(request);
  }

  @Post("login")
  login(@Body() request: LoginRequest) {
    return this.authService.login(request);
  }


// ... داخل کلاس کنترلر

  @Post("forgot-password")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mobileNumber: {
          type: 'string',
          example: '09123456789',
        },
      },
    },
  })
  forgotPassword(@Body('mobileNumber') mobileNumber: string) {
    return this.authService.forgotPassword(mobileNumber);
  }
  @Post("change-password")
  changePassword(@Body() request : ChangePasswordRequest
  ) {
    debugger;
    return this.authService.changePassword(request);
  }
}
