import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { Role } from "../entities/role";
export interface IRoleRepository extends IBaseRepository<string, Role> {
    existsByRoleName(roleName: string): Promise<boolean>;
}
