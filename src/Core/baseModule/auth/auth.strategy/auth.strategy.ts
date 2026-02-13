import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConfig } from "../../../../config/env";

export interface JwtAccessPayload {
  sub: string;
  username?: string;
  roles?: string[];
}

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    const auth = authConfig();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: auth.accessTokenSecret,
    });
  }

  async validate(payload: JwtAccessPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException("Invalid access token");
    }

    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles ?? [],
    };
  }
}
