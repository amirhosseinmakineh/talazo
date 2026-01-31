import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { RolePermission } from "../../domain/entities/rolePermission";
import { IRolePermissionRepository } from "../../domain/iRepositoryies/iRolePermissionRepository";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

export class RolePermissionRepository extends BaseRepository<string, RolePermission>
     implements IRolePermissionRepository {
          constructor(@InjectRepository(RolePermission) repo : Repository<RolePermission>)
          {
               super(repo);
          }
}
