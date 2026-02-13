import { UserService } from "../application/services/user.Service";
import { Result } from "../../../../shared/patterns/result";
import { UsersResponse } from "../responses/user/usersResponse";
import { UpdateUserRequest } from "../requests/user/updateUserRequest";
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
