import { BaseEntity } from "../../../../Core/domain/base.Entity";
import { UserStatus } from "./userStatus";
import { Role } from "./role";
export declare class User extends BaseEntity {
    username: string;
    passwordHash: string;
    mobileNumber: string;
    userStatus: UserStatus;
    refreshTokenHash?: string | null;
    refreshTokenExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
    roles: Role[];
}
