import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { Role } from "../../domain/entities/role";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";
import { Repository } from "typeorm";
export declare class RoleRepository extends BaseRepository<string, Role> implements IRoleRepository {
    constructor(repo: Repository<Role>);
    existsByRoleName(roleName: string): Promise<boolean>;
}
