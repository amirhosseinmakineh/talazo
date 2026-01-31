import { ApiProperty } from "@nestjs/swagger";
export class LoginRequest {
  @ApiProperty()
  identifier!: string;

  @ApiProperty()
  password!: string;
}
