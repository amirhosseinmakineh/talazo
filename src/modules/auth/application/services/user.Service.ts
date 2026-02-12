import { Inject, Injectable } from "@nestjs/common";
import { Result } from "../../../../shared/patterns/result";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";
import { IUserService } from "../../../../Core/baseModule/contracts/iUserService";
import { UpdateUserRequest } from "../../../../Core/baseModule/requests/user/updateUserRequest";
import { UsersResponse } from "../../../../Core/baseModule/responses/user/usersResponse";
import { Cursor } from "../../../../shared/patterns/cursure";
import { DateService } from "../../../../../utilities/dateService";
import { HttpStatusCode } from "../../../../../utilities/httpStatusCode";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject("IUserRepository")
    private readonly repository: IUserRepository,
    private readonly dateService: DateService,
  ) {}

  async getAllUsers(
    cursor?: string,
    limit: number = 10,
  ): Promise<
    Result<{
      items: UsersResponse[];
      nextCursor?: string;
      hasNextPage: boolean;
      totalCount?: number;
    }>
  > {
    const users = await this.repository.getAll();

    const sortedUsers = users.sort((a, b) => (a.id > b.id ? 1 : -1));

    let startIndex = 0;
    if (cursor) {
      const decodedCursor = Cursor.decode(cursor);
      const index = sortedUsers.findIndex((u) => u.id === decodedCursor);
      startIndex = index >= 0 ? index + 1 : 0;
    }

    const sliced = sortedUsers.slice(startIndex, startIndex + limit + 1);
    const hasNextPage = sliced.length > limit;

    const pageItems = hasNextPage ? sliced.slice(0, limit) : sliced;

    const items: UsersResponse[] = pageItems.map((u) => ({
      userName: u.username,
      mobileNumber: u.mobileNumber,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      isDeleted: u.isDeleted,
      deletedAt: u.deletedAt,
    }));

    const nextCursor = hasNextPage
      ? Cursor.encode(pageItems[pageItems.length - 1].id)
      : undefined;

    return Result.success(
      {
        items,
        nextCursor,
        hasNextPage,
        totalCount: users.length,
      },
      "Users retrieved successfully",
    );
  }

  async updateUser(request: UpdateUserRequest): Promise<Result<UsersResponse>> {
    const user = await this.repository.getByUserName(request.userName);

    if (!user) {
      return Result.failure("کاربری یافت نشد", HttpStatusCode.NOT_FOUND);
    }

    const date = new Date();

    const criteria = {
      username: request.userName,
      mobileNumber: request.mobileNumber,
      updatedAt: this.dateService.convertTimestampToPersian(date.getTime()),
    } as any;

    await this.repository.updateEntity(
      { id: user.id, isDeleted: false } as any,
      criteria,
    );

    const updatedUser = await this.repository.getByUserName(request.userName);

    if (!updatedUser) {
      return Result.failure(
        "خطا در دریافت کاربر بعد از آپدیت",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const userName = updatedUser.username as string | undefined;

    if (!userName) {
      return Result.failure(
        "نام کاربری نامعتبر است",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    if (updatedUser.mobileNumber == null) {
      return Result.failure(
        "شماره موبایل نامعتبر است",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const response: UsersResponse = {
      userName: userName,
      mobileNumber: updatedUser.mobileNumber,
      createdAt: updatedUser.createdAt ?? null,
      updatedAt: updatedUser.updatedAt ?? null,
      isDeleted: updatedUser.isDeleted,
      deletedAt: updatedUser.deletedAt ?? null,
    };

    return Result.success(
      response,
      "آپدیت کاربر با موفقیت انجام شد",
      HttpStatusCode.OK,
    );
  }

  async deleteUser(id: string): Promise<Result<UsersResponse>> {
    const user = await this.repository.getById(id);

    if (!user || user.isDeleted) {
      return Result.failure("کاربری یافت نشد", HttpStatusCode.NOT_FOUND);
    }

    const now = new Date();
    const nowPersian = this.dateService.convertTimestampToPersian(
      now.getTime(),
    );

    await this.repository.updateEntity(
      { id: user.id } as any,
      {
        isDeleted: true,
        deletedAt: nowPersian,
        updatedAt: nowPersian,
      } as any,
    );

    const deletedUser = await this.repository.getById(id);

    if (!deletedUser) {
      return Result.failure(
        "خطا در حذف کاربر",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    if (!deletedUser.username) {
      return Result.failure(
        "نام کاربری نامعتبر است",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    const response: UsersResponse = {
      userName: (deletedUser.username ?? deletedUser.username)!,
      mobileNumber: deletedUser.mobileNumber,
      createdAt: deletedUser.createdAt ?? null,
      updatedAt: deletedUser.updatedAt ?? null,
      isDeleted: deletedUser.isDeleted,
      deletedAt: deletedUser.deletedAt ?? null,
    };

    return Result.success(
      response,
      "کاربر با موفقیت حذف شد",
      HttpStatusCode.OK,
    );
  }
}
