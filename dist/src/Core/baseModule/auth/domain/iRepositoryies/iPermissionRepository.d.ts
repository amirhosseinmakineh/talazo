import { IBaseRepository } from "../../../../Core/domain/iBaseRepository";
import { Permission } from "../entities/permission";
export interface IPermissionRepository extends IBaseRepository<string, Permission> {
}
