import { Result } from "@modules/shared/patterns/result";
import { GetAllRolesResponse } from "./responses/getAllRoles";
export interface IRoleService {
    getAllRoles(): Promise<Result<GetAllRolesResponse[]>>;
    createRole(roleName: string): Promise<void>;
    updateRole(roleId: string): Promise<void>;
    deleteRole(roleId: string): Promise<void>;
    addRoleToUser(userId: string, roleName: string, moduleKey?: string): Promise<void>;
}
