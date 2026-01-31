import { BaseEntity } from "../../../../Core/domain/base.Entity";
import { Permission } from "./permission";
import { Role } from "./role";
export declare class RolePermission extends BaseEntity {
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}
