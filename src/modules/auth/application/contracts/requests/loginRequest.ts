import { ApiProperty } from "@nestjs/swagger";
export class LoginRequest {
  @ApiProperty()
  mobileNumber!: string;

  @ApiProperty()
  password!: string;
}
