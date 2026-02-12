import { DateService } from "utilities/dateService";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";
import { IRoleService } from "../../../../Core/baseModule/contracts/iRoleService";
import { GetAllRolesResponse } from "../../../../Core/baseModule/responses/role/getAllRoles";
import { Result } from "@modules/shared/patterns/result";
import { Inject, Injectable } from "@nestjs/common";
import {
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../../../../Core/baseModule/requests/role/createRoleRequest";
import { Role } from "../../domain/entities/role";
import { HttpStatusCode } from "utilities/httpStatusCode";
import { IUserRepository } from "../../domain/iRepositoryies/iUserRepository";

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject("IRoleRepository")
    private readonly repository: IRoleRepository,
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
    private readonly dateService: DateService,
  ) {}

  async getAllRoles(
    cursor: string | null,
    limit: number,
  ): Promise<
    Result<{
      items: GetAllRolesResponse[];
      nextCursor?: string;
      hasNextPage: boolean;
      totalCount?: number;
    }>
  > {
    var roles = await this.repository.getAll();

    var sortedRoles = roles.sort((a, b) => a.id.localeCompare(b.id));

    var startIndex = 0;
    if (cursor) {
      var index = sortedRoles.findIndex((r) => r.id === cursor);
      startIndex = index >= 0 ? index + 1 : 0;
    }

    var sliced = sortedRoles.slice(startIndex, startIndex + limit);
    var hasNextPage = startIndex + limit < sortedRoles.length;

    var nextCursor = hasNextPage ? sliced[sliced.length - 1].id : undefined;

    var result = {
      items: sliced.map((r) => ({
        id: r.id,
        userId: r.userId,
        roleName: r.roleName,
      })),
      nextCursor,
      hasNextPage,
      totalCount: sortedRoles.length,
    };

    return Result.success(result);
  }

  async createRole(request: CreateRoleRequest): Promise<Result<string>> {
    var date = new Date();

    var role = Object.assign(new Role(), {
      userId: request.userId,
      roleName: request.roleName,
      createdAt: this.dateService.convertTimestampToPersian(date.getTime()),
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    });

    var createdRole = await this.repository.createEntity(role);

    return Result.success(
      createdRole.id,
      "کاربر با موفقیت به سیستم اضافه شد",
      HttpStatusCode.CREATED,
    );
  }

  async updateRole(request: UpdateRoleRequest): Promise<Result<string>> {
    var role = await this.repository.getById(request.roleId);

    if (!role) {
      return Result.failure("نقش وجود ندارد", HttpStatusCode.NOT_FOUND);
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    await this.repository.updateEntity(
      { id: request.roleId } as any,
      {
        roleName: request.roleName,
        updatedAt: now,
      } as any,
    );

    return Result.success(
      request.roleId,
      "نقش با موفقیت آپدیت شد",
      HttpStatusCode.CREATED,
    );
  }

  async deleteRole(roleId: string): Promise<void> {
    if (!roleId) {
      throw new Error("roleId is required");
    }

    var role = await this.repository.getById(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    await this.repository.updateEntity(
      { id: roleId } as any,
      {
        isDeleted: true,
        deletedAt: now,
        updatedAt: now,
      } as any,
    );
  }

  async addRoleToUser(
    userId: string,
    roleName: string,
    moduleKey?: string,
  ): Promise<Result<string>> {
    var user = await this.userRepository.getById(userId);

    if (!user) {
      return Result.failure("کاربر یافت نشد");
    }

    var roles = this.repository.createQueryBuilder("role");

    roles.where("role.userId = :userId", { userId });
    roles.andWhere("role.roleName = :roleName", { roleName });
    roles.andWhere("role.isDeleted = :isDeleted", { isDeleted: false });

    if (moduleKey) {
      roles.andWhere("role.moduleKey = :moduleKey", { moduleKey });
    } else {
      roles.andWhere("role.moduleKey IS NULL");
    }

    var existRole = await roles.getOne();

    if (existRole) {
      return Result.failure(
        "این نقش قبلا ثبت شده است",
        HttpStatusCode.CONFLICT,
      );
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    var role = Object.assign(new Role(), {
      userId: userId,
      roleName: roleName,
      moduleKey: moduleKey ?? null,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    });

    var created = await this.repository.createEntity(role);

    return Result.success(
      created.id,
      "نقش برای کاربر ثبت شد",
      HttpStatusCode.CREATED,
    );
  }
}
