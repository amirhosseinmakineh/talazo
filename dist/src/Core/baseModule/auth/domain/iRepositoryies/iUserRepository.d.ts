import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { User } from "../entities/user";
export interface IUserRepository extends IBaseRepository<string, User> {
    getByUserName(userName: string): Promise<User | null>;
    getUserByMobileNumber(mobileNumber: string): Promise<User | null>;
    getUserByResetToken(resetToken: string): Promise<User | null>;
}
