import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class ForgotPasswordRequest {
  @ApiProperty({ example: "09123456789" })
  @IsNotEmpty()
  @IsMobilePhone("fa-IR")
  mobileNumber!: string;
}
