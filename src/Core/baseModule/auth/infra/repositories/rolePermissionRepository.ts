import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseRepository } from "../../../../infra/baseRepository";
import { RolePermission } from "../../domain/entities/rolePermission";
import { IRolePermissionRepository } from "../../domain/iRepositoryies/iRolePermissionRepository";

@Injectable()
export class RolePermissionRepository
  extends BaseRepository<string, RolePermission>
  implements IRolePermissionRepository
{
  constructor(@InjectRepository(RolePermission) repo: Repository<RolePermission>) {
    super(repo);
  }
}
