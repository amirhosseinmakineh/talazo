import { Result } from "../../../../shared/patterns/result";
import { CreateRoleRequest, UpdateRoleRequest } from "../requests/role/createRoleRequest";
import { GetAllRolesResponse } from "../responses/role/getAllRoles";
export interface IRoleService {
    getAllRoles(cursor: string | null, limit: number): Promise<Result<{
        items: GetAllRolesResponse[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>>;
    createRole(request: CreateRoleRequest): Promise<Result<string>>;
    updateRole(request: UpdateRoleRequest): Promise<Result<string>>;
    deleteRole(roleId: string): Promise<void>;
    addRoleToUser(userId: string, roleName: string, moduleKey?: string): Promise<Result<string>>;
}
