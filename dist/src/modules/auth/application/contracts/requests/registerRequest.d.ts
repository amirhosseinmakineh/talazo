import { UserStatus } from "../../../domain/entities/userStatus";
export declare class RegisterRequest {
    userName: string;
    password: string;
    userStatus: UserStatus;
    mobileNumber: string;
}
