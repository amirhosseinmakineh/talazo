"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let PasswordService = class PasswordService {
    constructor() {
        this.iterations = 100_000;
        this.keylen = 64;
        this.digest = "sha512";
    }
    hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString("hex");
        const hash = (0, crypto_1.pbkdf2Sync)(password, salt, this.iterations, this.keylen, this.digest).toString("hex");
        return `${salt}:${hash}`;
    }
    verifyPassword(stored, password) {
        if (!stored) {
            return false;
        }
        const parts = stored.split(":");
        if (parts.length !== 2) {
            throw new Error(`Invalid stored password format. Expected "salt:hash" but got: "${stored}"`);
        }
        const [salt, originalHash] = parts;
        const hash = (0, crypto_1.pbkdf2Sync)(password, salt, this.iterations, this.keylen, this.digest).toString("hex");
        if (hash.length !== originalHash.length)
            return false;
        return (0, crypto_1.timingSafeEqual)(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)()
], PasswordService);
//# sourceMappingURL=passwordService.js.map