import { IRoleService } from "../application/contracts/iRoleService";
export declare class RoleController {
    private readonly service;
    constructor(service: IRoleService);
    getAllRoles(): Promise<import("../../../shared/patterns/result").Result<import("../application/contracts/responses/getAllRoles").GetAllRolesResponse[]>>;
    createRole(roleName: string): Promise<void>;
    updateRole(roleId: string): Promise<void>;
    deleteRole(roleId: string): Promise<void>;
    addRoleToUser(userId: string, roleName: string, moduleKey?: string): Promise<void>;
}
