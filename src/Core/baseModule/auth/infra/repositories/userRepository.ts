import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseRepository } from "../../../../infra/baseRepository";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";

@Injectable()
export class UserRepository
  extends BaseRepository<string, User>
  implements IUserRepository
{
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  getUserByResetToken(passwordResetTokenHash: string): Promise<User | null> {
    return this.repository.findOne({ where: { passwordResetTokenHash } });
  }

  getUserByMobileNumber(mobileNumber: string): Promise<User | null> {
    return this.repository.findOne({ where: { mobileNumber } });
  }

  async getByUserName(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }
}
