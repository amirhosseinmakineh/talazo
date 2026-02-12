import { BaseRepository } from "../baseRepository";
import { RolePermission } from "../../baseModule/auth/domain/entities/rolePermission";
import { IRolePermissionRepository } from "../../baseModule/auth/domain/iRepositoryies/iRolePermissionRepository";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

export class RolePermissionRepository extends BaseRepository<string, RolePermission>
     implements IRolePermissionRepository {
          constructor(@InjectRepository(RolePermission) repo : Repository<RolePermission>)
          {
               super(repo);
          }
}
