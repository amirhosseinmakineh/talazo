import { Injectable } from "@nestjs/common";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

@Injectable()
export class PasswordService {
  private readonly iterations = 100_000;
  private readonly keylen = 64;
  private readonly digest = "sha512";

  hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keylen,
      this.digest,
    ).toString("hex");

    return `${salt}:${hash}`;
  }

  verifyPassword(stored: string | null | undefined, password: string): boolean {
    if (!stored) {
      return false;
    }

    const parts = stored.split(":");
    if (parts.length !== 2) {
      throw new Error(
        `Invalid stored password format. Expected "salt:hash" but got: "${stored}"`,
      );
    }

    const [salt, originalHash] = parts;

    const hash = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keylen,
      this.digest,
    ).toString("hex");
    if (hash.length !== originalHash.length) return false;

    return timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(originalHash, "hex"),
    );
  }
}
