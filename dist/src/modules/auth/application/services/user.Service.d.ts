import { Result } from "../../../../shared/patterns/result";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { IUserService } from '../contracts/iUserService';
import { UpdateUserRequest } from "../contracts/requests/updateUserRequest";
import { UsersResponse } from "../contracts/responses/usersResponse";
import { DateService } from "../../../../../utilities/dateService";
export declare class UserService implements IUserService {
    private readonly repository;
    private readonly dateService;
    constructor(repository: IUserRepository, dateService: DateService);
    getAllUsers(cursor?: string, limit?: number): Promise<Result<{
        items: UsersResponse[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>>;
    updateUser(request: UpdateUserRequest): Promise<Result<UsersResponse>>;
    deleteUser(id: string): Promise<Result<UsersResponse>>;
}
