import { BaseEntity } from "../../../../domain/base.Entity";
import { RolePermission } from "./rolePermission";
export declare class Permission extends BaseEntity {
    key: string;
    permissionName: string;
    moduleKey: string | null;
    rolePermissions: RolePermission[];
}
