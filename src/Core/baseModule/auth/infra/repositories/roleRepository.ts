import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseRepository } from "../../../../infra/baseRepository";
import { Role } from "../../domain/entities/role";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";

@Injectable()
export class RoleRepository
  extends BaseRepository<string, Role>
  implements IRoleRepository
{
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo);
  }

  async existsByRoleName(roleName: string): Promise<boolean> {
    return this.repository.exists({ where: { roleName } });
  }
}
