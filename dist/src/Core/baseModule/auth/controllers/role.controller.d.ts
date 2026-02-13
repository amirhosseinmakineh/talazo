import { IRoleService } from "../contracts/iRoleService";
import { CreateRoleRequest, UpdateRoleRequest } from "../requests/role/createRoleRequest";
export declare class RoleController {
    private readonly service;
    constructor(service: IRoleService);
    getAllRoles(cursor?: string | null, limit?: number): Promise<import("../../../../shared/patterns/result").Result<{
        items: import("../responses/role/getAllRoles").GetAllRolesResponse[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>>;
    createRole(request: CreateRoleRequest): Promise<import("../../../../shared/patterns/result").Result<string>>;
    updateRole(request: UpdateRoleRequest): Promise<import("../../../../shared/patterns/result").Result<string>>;
    deleteRole(roleId: string): Promise<void>;
    addRoleToUser(userId: string, roleName: string, moduleKey?: string): Promise<import("../../../../shared/patterns/result").Result<string>>;
}
