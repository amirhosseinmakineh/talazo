import { BaseRepository } from "../baseRepository";
import { Role } from "../../baseModule/auth/domain/entities/role";
import { IRoleRepository } from "../../baseModule/auth/domain/iRepositoryies/iRoleRepository";
import { Repository } from "typeorm";
export declare class RoleRepository extends BaseRepository<string, Role> implements IRoleRepository {
    constructor(repo: Repository<Role>);
    existsByRoleName(roleName: string): Promise<boolean>;
}
