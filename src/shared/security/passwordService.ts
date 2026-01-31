import { Injectable } from "@nestjs/common";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

@Injectable()
export class PasswordService {
  private readonly iterations = 100_000;
  private readonly keylen = 64;
  private readonly digest = "sha512";

  hashPassword(password: string): string {
    debugger;
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keylen,
      this.digest
    ).toString("hex");

    return `${salt}:${hash}`;
  }

verifyPassword(stored: string | null | undefined, password: string): boolean {
  debugger;
  if (!stored) {
    // این یعنی passwordHash اصلاً از DB نیومده یا null بوده
    return false;
  }

  const parts = stored.split(":");
  if (parts.length !== 2) {
    // یعنی فرمت ذخیره‌شده غلطه
    // نمونه صحیح: "salt:hash"
    throw new Error(`Invalid stored password format. Expected "salt:hash" but got: "${stored}"`);
  }

  const [salt, originalHash] = parts;

  const hash = pbkdf2Sync(
    password,
    salt,
    this.iterations,
    this.keylen,
    this.digest
  ).toString("hex");

  // طول‌ها باید برابر باشن وگرنه timingSafeEqual خودش throw می‌کنه
  if (hash.length !== originalHash.length) return false;

  return timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(originalHash, "hex")
  );
}

}
