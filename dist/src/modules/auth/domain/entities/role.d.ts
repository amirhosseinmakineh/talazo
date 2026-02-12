import { BaseEntity } from "../../../../Core/domain/base.Entity";
import { RolePermission } from "./rolePermission";
import { User } from "./user";
export declare class Role extends BaseEntity {
    roleName: string;
    moduleKey: string | null;
    userId: string;
    user: User;
    rolePermissions: RolePermission[];
}
