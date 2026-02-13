import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../../domain/entities/userStatus";
import {
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class RegisterRequest {
  @ApiProperty({ example: "amirhossein" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/)
  userName!: string;

  @ApiProperty({ example: "12345678", minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus)
  userStatus!: UserStatus;

  @ApiProperty({ example: "09123456789" })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone("fa-IR")
  mobileNumber!: string;
}
