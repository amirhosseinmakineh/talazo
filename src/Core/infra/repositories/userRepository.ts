import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsWhere } from "typeorm";

import { BaseRepository } from "../baseRepository";
import { IUserRepository } from "../../baseModule/auth/domain/iRepositoryies/iUserRepository";
import { User } from "../../baseModule/auth/domain/entities/user";

@Injectable()
export class UserRepository
  extends BaseRepository<string, User>
  implements IUserRepository
{
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
  getUserByResetToken(passwordResetTokenHash: string): Promise<User | null> {
    return this.repository.findOne({where : {passwordResetTokenHash}} as any);
  }
  getUserByMobileNumber(mobileNumber: string): Promise<User | null> {
    return this.repository.findOne({where : {mobileNumber} as any})
  }
    async getByUserName(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username } as any,
    });
}
}
