import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { RolePermission } from "../../domain/entities/rolePermission";
import { IRolePermissionRepository } from "../../domain/iRepositoryies/iRolePermissionRepository";
import { Repository } from "typeorm";
export declare class RolePermissionRepository extends BaseRepository<string, RolePermission> implements IRolePermissionRepository {
    constructor(repo: Repository<RolePermission>);
}
