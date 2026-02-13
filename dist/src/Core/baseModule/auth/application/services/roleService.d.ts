import { DateService } from "utilities/dateService";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";
import { IRoleService } from "../../contracts/iRoleService";
import { GetAllRolesResponse } from "../../responses/role/getAllRoles";
import { Result } from "../../../../../shared/patterns/result";
import { CreateRoleRequest, UpdateRoleRequest } from "../../requests/role/createRoleRequest";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
export declare class RoleService implements IRoleService {
    private readonly repository;
    private readonly userRepository;
    private readonly dateService;
    constructor(repository: IRoleRepository, userRepository: IUserRepository, dateService: DateService);
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
