import { Role } from "../domain/entities/role";

export interface JwtAccessPayload {
  subject: string;
  username?: string;
  roles?: string[];
  typ: "access";
}

export interface JwtRefreshPayload {
  subject: string;
  jti: string;
  typ: "refresh";
}
