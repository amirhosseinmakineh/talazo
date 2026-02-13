import { BaseRepository } from "../baseRepository";
import { RolePermission } from "../../baseModule/auth/domain/entities/rolePermission";
import { IRolePermissionRepository } from "../../baseModule/auth/domain/iRepositoryies/iRolePermissionRepository";
import { Repository } from "typeorm";
export declare class RolePermissionRepository extends BaseRepository<string, RolePermission> implements IRolePermissionRepository {
    constructor(repo: Repository<RolePermission>);
}
