export declare class PasswordService {
    private readonly iterations;
    private readonly keylen;
    private readonly digest;
    hashPassword(password: string): string;
    verifyPassword(stored: string | null | undefined, password: string): boolean;
}
