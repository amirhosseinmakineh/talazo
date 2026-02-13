import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../domain/entities/user";
import { randomBytes, createHash } from "crypto";
import type { StringValue } from "ms";
import { JwtAccessPayload, JwtRefreshPayload } from "../../utilities/JwtAccessPayload"

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

async signAccessToken(user: User): Promise<string> {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error('JWT_ACCESS_SECRET is not set');

  const payload: JwtAccessPayload = {
    sub: user.id,
    username: user.username,
    typ: 'access',
    mobileNumber : user.mobileNumber,
  };

  const expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as StringValue;

  return this.jwtService.signAsync(payload, {
    secret,
    expiresIn,
  });
}


verifyAccessToken(token: string): JwtAccessPayload | null {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not set");

  try {
    return this.jwtService.verify<JwtAccessPayload>(token, { secret });
  } catch {
    return null;
  }
}


  async signRefreshToken(user: User): Promise<string> {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error("JWT_REFRESH_SECRET is not set");

    const payload: JwtRefreshPayload = {
      sub: user.id,
      jti: randomBytes(16).toString("hex"),
      typ: "refresh",
    };

    const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as StringValue;

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  verifyRefreshToken(token: string): JwtRefreshPayload | null {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error("JWT_REFRESH_SECRET is not set");

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

