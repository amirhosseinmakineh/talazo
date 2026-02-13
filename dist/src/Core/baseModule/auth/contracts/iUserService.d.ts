import { Result } from "../../../../shared/patterns/result";
import { UpdateUserRequest } from "../requests/user/updateUserRequest";
import { UsersResponse } from "../responses/user/usersResponse";
export interface IUserService {
    getAllUsers(cursor?: string, limit?: number): Promise<Result<{
        items: UsersResponse[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>>;
    updateUser(request: UpdateUserRequest): Promise<Result<UsersResponse>>;
    deleteUser(id: string): Promise<Result<UsersResponse>>;
}
