import { Repository } from "typeorm";
import { BaseRepository } from "../baseRepository";
import { IUserRepository } from "../../baseModule/auth/domain/iRepositoryies/iUserRepository";
import { User } from "../../baseModule/auth/domain/entities/user";
export declare class UserRepository extends BaseRepository<string, User> implements IUserRepository {
    constructor(repo: Repository<User>);
    getUserByResetToken(passwordResetTokenHash: string): Promise<User | null>;
    getUserByMobileNumber(mobileNumber: string): Promise<User | null>;
    getByUserName(username: string): Promise<User | null>;
}
