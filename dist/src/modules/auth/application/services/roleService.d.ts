import { DateService } from "utilities/dateService";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";
import { IRoleService } from "../contracts/iRoleService";
import { GetAllRolesResponse } from "../contracts/responses/getAllRoles";
import { Result } from "@modules/shared/patterns/result";
export declare class RoleService implements IRoleService {
    private readonly repository;
    private readonly dateService;
    constructor(repository: IRoleRepository, dateService: DateService);
    getAllRoles(): Promise<Result<GetAllRolesResponse[]>>;
    createRole(roleName: string): Promise<void>;
    updateRole(roleId: string): Promise<void>;
    deleteRole(roleId: string): Promise<void>;
    addRoleToUser(userId: string, roleName: string, moduleKey?: string): Promise<void>;
}
