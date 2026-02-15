import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { Permission } from "../entities/permission";
export interface IPermissionRepository extends IBaseRepository<string, Permission> {
}
