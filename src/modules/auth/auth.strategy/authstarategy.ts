// src/auth/strategies/auth.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtAccessPayload {
  userId: string;   
  username?: string;
  roles?: string[];
}

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
const secret = process.env.JWT_ACCESS_SECRET;
if (!secret) {
  throw new Error('JWT_ACCESS_SECRET is not set');
}

super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,
});
}

  async validate(payload: JwtAccessPayload) {
    if (!payload?.userId) {
      throw new UnauthorizedException('Invalid access token');
    }
    return {
      userId: payload.userId,
      username: payload.username,
      roles: payload.roles ?? [],
    };
  }
}