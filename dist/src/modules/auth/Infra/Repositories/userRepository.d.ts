import { Repository } from "typeorm";
import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { User } from "../../domain/entities/user";
export declare class UserRepository extends BaseRepository<string, User> implements IUserRepository {
    constructor(repo: Repository<User>);
    getUserByResetToken(passwordResetTokenHash: string): Promise<User | null>;
    getUserByMobileNumber(mobileNumber: string): Promise<User | null>;
    getByUserName(username: string): Promise<User | null>;
}
