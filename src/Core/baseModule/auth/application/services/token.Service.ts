import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../domain/entities/user";
import { randomBytes, createHash } from "crypto";
import type { StringValue } from "ms";
import {
  JwtAccessPayload,
  JwtRefreshPayload,
} from "../../utilities/JwtAccessPayload";
import { authConfig } from "../../../../../config/env";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(user: User): Promise<string> {
    const auth = authConfig();
    const secret = auth.accessTokenSecret;

    const payload: JwtAccessPayload = {
      sub: user.id,
      username: user.username,
      typ: "access",
      mobileNumber: user.mobileNumber,
    };

    const expiresIn = auth.accessTokenExpiresIn as StringValue;

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  verifyAccessToken(token: string): JwtAccessPayload | null {
    const secret = authConfig().accessTokenSecret;

    try {
      return this.jwtService.verify<JwtAccessPayload>(token, { secret });
    } catch {
      return null;
    }
  }

  async signRefreshToken(user: User): Promise<string> {
    const auth = authConfig();
    const secret = auth.refreshTokenSecret;

    const payload: JwtRefreshPayload = {
      sub: user.id,
      jti: randomBytes(16).toString("hex"),
      typ: "refresh",
    };

    const expiresIn = auth.refreshTokenExpiresIn as StringValue;

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  verifyRefreshToken(token: string): JwtRefreshPayload | null {
    const auth = authConfig();
    const secret = auth.refreshTokenSecret;

    try {
      return this.jwtService.verify<JwtRefreshPayload>(token, { secret });
    } catch {
      return null;
    }
  }

  hash(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }
  parseExpiresToDate(expiresIn: string): Date {
    const match = expiresIn.match(/^(\d+)([mhd])$/i);

    if (!match) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    let ms = 0;
    switch (unit) {
      case "m":
        ms = value * 60 * 1000;
        break;
      case "h":
        ms = value * 60 * 60 * 1000;
        break;
      case "d":
        ms = value * 24 * 60 * 60 * 1000;
        break;
    }

    return new Date(Date.now() + ms);
  }
  generateResetToken(bytes: number = 32): string {
    return randomBytes(bytes).toString("hex");
  }
}
