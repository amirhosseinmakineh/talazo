import { UserService } from "../application/services/user.Service";
import { Result } from "../../../shared/patterns/result";
import { UsersResponse } from "../application/contracts/responses/usersResponse";
import { UpdateUserRequest } from "../application/contracts/requests/updateUserRequest";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(cursor?: string, limit?: string): Promise<Result<{
        items: UsersResponse[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>>;
    updateUser(request: UpdateUserRequest): Promise<Result<UsersResponse>>;
    deleteUser(id: string): Promise<Result<UsersResponse>>;
}
