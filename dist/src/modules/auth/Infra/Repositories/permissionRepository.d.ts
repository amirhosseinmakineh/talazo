import { Repository } from "typeorm";
import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { Permission } from "../../domain/entities/permission";
import { IPermissionRepository } from "../../domain/iRepositoryies/iPermissionRepository";
export declare class PermissionRepository extends BaseRepository<string, Permission> implements IPermissionRepository {
    constructor(repo: Repository<Permission>);
}
