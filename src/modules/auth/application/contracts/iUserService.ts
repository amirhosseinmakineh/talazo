import { Result } from "../../../../shared/patterns/result";
import { UsersResponse } from "./responses/usersResponse";
import { UpdateUserRequest } from "./requests/updateUserRequest";
import { Inject } from "@nestjs/common";


export interface IUserService {
getAllUsers(cursor?: string,limit?: number): Promise<Result<{items: UsersResponse[];nextCursor?: string;hasNextPage: boolean;totalCount?: number;}>>;
updateUser(request : UpdateUserRequest) : Promise<Result<UsersResponse>>;
deleteUser(id : string):Promise<Result<UsersResponse>>
}
