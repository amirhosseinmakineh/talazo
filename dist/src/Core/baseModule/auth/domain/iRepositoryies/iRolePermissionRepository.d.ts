import { IBaseRepository } from "../../../../Core/domain/iBaseRepository";
import { RolePermission } from "../entities/rolePermission";
export interface IRolePermissionRepository extends IBaseRepository<string, RolePermission> {
}
