import { Result } from "../../../../shared/patterns/result";
import { RolePermissionResponse } from "../responses/rolePermissionResponse/rolePermissionResponse";
import { CreateRolePermissionRequest } from "../requests/rolePermission/createRolePermissionRequest";
import { UpdateRolePermissionRequest } from "../requests/rolePermission/updateRolePermissionRequest";

export interface IRolePermissionService{
     getAllRolePermission(cursor: string | null,limit: number,): Promise<Result<{items: RolePermissionResponse[];nextCursor?: string;hasNextPage: boolean;totalCount?: number;}>>;
     createRolePermission(request : CreateRolePermissionRequest):Promise<Result<RolePermissionResponse>>
     updateRolePermission(request : UpdateRolePermissionRequest) : Promise<Result<RolePermissionResponse>>
     deleteRolePermission(id : string): Promise<Result<string>>
     addPermissionToRole(roleId : string,permissionId : string) : Promise<Result<string>>
     deletePermissionFromRole(roleId : string , permissionId : string) :Promise<Result<string>>
}