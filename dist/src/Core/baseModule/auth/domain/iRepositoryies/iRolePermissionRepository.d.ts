import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { RolePermission } from "../entities/rolePermission";
export interface IRolePermissionRepository extends IBaseRepository<string, RolePermission> {
}
