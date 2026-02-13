import { Repository } from "typeorm";
import { BaseRepository } from "../baseRepository";
import { Permission } from "../../baseModule/auth/domain/entities/permission";
import { IPermissionRepository } from "../../baseModule/auth/domain/iRepositoryies/iPermissionRepository";
export declare class PermissionRepository extends BaseRepository<string, Permission> implements IPermissionRepository {
    constructor(repo: Repository<Permission>);
}
