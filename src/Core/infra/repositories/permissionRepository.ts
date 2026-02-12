import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseRepository } from "../baseRepository";
import { Permission } from "../../baseModule/auth/domain/entities/permission";
import { IPermissionRepository } from "../../baseModule/auth/domain/iRepositoryies/iPermissionRepository";

@Injectable()
export class PermissionRepository
  extends BaseRepository<string, Permission>
  implements IPermissionRepository
{
  constructor(
    @InjectRepository(Permission) repo: Repository<Permission>
  ) {
    super(repo);
  }
}
