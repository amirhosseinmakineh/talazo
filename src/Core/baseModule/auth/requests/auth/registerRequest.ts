import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../../domain/entities/userStatus";

export class RegisterRequest {
  @ApiProperty({ example: "amirhossein" })
  userName!: string;

  @ApiProperty({ example: "12345678" })
  password!: string;

  @ApiProperty({ enum: UserStatus })
  userStatus!: UserStatus;

  @ApiProperty({ example: "09123456789" })
  mobileNumber!: string;
}
