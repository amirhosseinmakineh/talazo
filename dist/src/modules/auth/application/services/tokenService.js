"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let TokenService = class TokenService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async signAccessToken(user) {
        debugger;
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret)
            throw new Error("JWT_ACCESS_SECRET is not set");
        const payload = {
            subject: user.id,
            username: user.username,
            typ: "access",
        };
        const expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN ?? "15m");
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }
    verifyAccessToken(token) {
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret)
            throw new Error("JWT_ACCESS_SECRET is not set");
        try {
            return this.jwtService.verify(token, { secret });
        }
        catch {
            return null;
        }
    }
    async signRefreshToken(user) {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret)
            throw new Error("JWT_REFRESH_SECRET is not set");
        const payload = {
            subject: user.id,
            jti: (0, crypto_1.randomBytes)(16).toString("hex"),
            typ: "refresh",
        };
        const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d");
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }
    verifyRefreshToken(token) {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret)
            throw new Error("JWT_REFRESH_SECRET is not set");
        try {
            return this.jwtService.verify(token, { secret });
        }
        catch {
            return null;
        }
    }
    hash(value) {
        return (0, crypto_1.createHash)("sha256").update(value).digest("hex");
    }
    parseExpiresToDate(expiresIn) {
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
    generateResetToken(bytes = 32) {
        return (0, crypto_1.randomBytes)(bytes).toString("hex");
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=tokenService.js.map