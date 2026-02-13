import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseRepository } from "../../../../infra/baseRepository";
import { Permission } from "../../domain/entities/permission";
import { IPermissionRepository } from "../../domain/iRepositoryies/iPermissionRepository";

@Injectable()
export class PermissionRepository
  extends BaseRepository<string, Permission>
  implements IPermissionRepository
{
  constructor(@InjectRepository(Permission) repo: Repository<Permission>) {
    super(repo);
  }
}
