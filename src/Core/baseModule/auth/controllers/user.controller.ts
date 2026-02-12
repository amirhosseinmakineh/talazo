import {
  Controller,
  Get,
  Patch,
  Delete,
  Query,
  Body,
  Param,
} from "@nestjs/common";
import { UserService } from "../application/services/user.Service";
import { Result } from "../../../../shared/patterns/result";
import { UsersResponse } from "../responses/user/usersResponse";
import { UpdateUserRequest } from "../requests/user/updateUserRequest";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(
    @Query("cursor") cursor?: string,
    @Query("limit") limit?: string,
  ): Promise<
    Result<{
      items: UsersResponse[];
      nextCursor?: string;
      hasNextPage: boolean;
      totalCount?: number;
    }>
  > {
    const parsedLimit = limit ? Number(limit) : 10;
    return this.userService.getAllUsers(cursor, parsedLimit);
  }

  @Patch()
  updateUser(
    @Body() request: UpdateUserRequest,
  ): Promise<Result<UsersResponse>> {
    return this.userService.updateUser(request);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string): Promise<Result<UsersResponse>> {
    return this.userService.deleteUser(id);
  }
}
