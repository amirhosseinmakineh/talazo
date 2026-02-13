import { JwtService } from "@nestjs/jwt";
import { User } from "../../domain/entities/user";
import { JwtAccessPayload, JwtRefreshPayload } from "../../utilities/JwtAccessPayload";
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(user: User): Promise<string>;
    verifyAccessToken(token: string): JwtAccessPayload | null;
    signRefreshToken(user: User): Promise<string>;
    verifyRefreshToken(token: string): JwtRefreshPayload | null;
    hash(value: string): string;
    parseExpiresToDate(expiresIn: string): Date;
    generateResetToken(bytes?: number): string;
}
