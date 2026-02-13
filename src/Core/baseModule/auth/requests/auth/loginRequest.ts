import { ApiProperty } from "@nestjs/swagger";
import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class LoginRequest {
  @ApiProperty({ example: "09123456789" })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone("fa-IR")
  mobileNumber!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
