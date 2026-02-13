import { DateService } from "utilities/dateService";
import { Result } from "../../../../../shared/patterns/result";
import { Inject, Injectable } from "@nestjs/common";
import { HttpStatusCode } from "utilities/httpStatusCode";
import { IRolePermissionService } from "../../contracts/irolePermission.Service";
import { IRolePermissionRepository } from "../../domain/iRepositoryies/iRolePermissionRepository";
import { RolePermission } from "../../domain/entities/rolePermission";
import { RolePermissionResponse } from "../../responses/rolePermissionResponse/rolePermissionResponse";
import { CreateRolePermissionRequest } from "../../requests/rolePermission/createRolePermissionRequest";
import { UpdateRolePermissionRequest } from "../../requests/rolePermission/updateRolePermissionRequest";

@Injectable()
export class RolePermissionService implements IRolePermissionService {
  constructor(
    @Inject("IRolePermissionRepository")
    private readonly repository: IRolePermissionRepository,
    private readonly dateService: DateService,
  ) {}

  async getAllRolePermission(
    cursor: string | null,
    limit: number,
  ): Promise<
    Result<{
      items: RolePermissionResponse[];
      nextCursor?: string;
      hasNextPage: boolean;
      totalCount?: number;
    }>
  > {
    var rolePermissions = await this.repository.getAll();

    var activeRolePermissions = rolePermissions.filter(
      (x) => x.isDeleted === false,
    );

    var sortedRolePermissions = activeRolePermissions.sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    var startIndex = 0;
    if (cursor) {
      var index = sortedRolePermissions.findIndex((x) => x.id === cursor);
      startIndex = index >= 0 ? index + 1 : 0;
    }

    var slicedRolePermissions = sortedRolePermissions.slice(
      startIndex,
      startIndex + limit,
    );

    var hasNextPage = startIndex + limit < sortedRolePermissions.length;

    var nextCursor = hasNextPage
      ? slicedRolePermissions[slicedRolePermissions.length - 1].id
      : undefined;

    return Result.success({
      items: slicedRolePermissions.map((rp) => ({
        rolePermissionId: rp.id,
        roleId: rp.roleId,
        permissionId: rp.permissionId,
        createdAt: rp.createdAt,
        updatedAt: rp.updatedAt,
        deletedAt: rp.deletedAt,
        isDeleted: rp.isDeleted,
      })),
      nextCursor,
      hasNextPage,
      totalCount: sortedRolePermissions.length,
    });
  }

  async createRolePermission(
    request: CreateRolePermissionRequest,
  ): Promise<Result<RolePermissionResponse>> {
    var now = this.dateService.convertTimestampToPersian(Date.now());

    var rolePermissionEntity = Object.assign(new RolePermission(), {
      roleId: request.roleId,
      permissionId: request.permissionId,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    });

    var createdRolePermission =
      await this.repository.createEntity(rolePermissionEntity);

    return Result.success(
      {
        rolePermissionId: createdRolePermission.id,
        roleId: createdRolePermission.roleId,
        permissionId: createdRolePermission.permissionId,
        createdAt: createdRolePermission.createdAt,
        updatedAt: createdRolePermission.updatedAt,
        deletedAt: createdRolePermission.deletedAt,
        isDeleted: createdRolePermission.isDeleted,
      },
      "با موفقیت ایجاد شد",
      HttpStatusCode.CREATED,
    );
  }

  async updateRolePermission(
    request: UpdateRolePermissionRequest,
  ): Promise<Result<RolePermissionResponse>> {
    var rolePermission = await this.repository.getById(request.rolePermissionId);

    if (!rolePermission || rolePermission.isDeleted) {
      return Result.failure("رکورد یافت نشد", HttpStatusCode.NOT_FOUND);
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    await this.repository.updateEntity(
      { id: request.rolePermissionId } as any,
      {
        roleId: request.roleId,
        permissionId: request.permissionId,
        updatedAt: now,
      } as any,
    );

    var updatedRolePermission = await this.repository.getById(
      request.rolePermissionId,
    );

    return Result.success(
      {
        rolePermissionId: updatedRolePermission!.id,
        roleId: updatedRolePermission!.roleId,
        permissionId: updatedRolePermission!.permissionId,
        createdAt: updatedRolePermission!.createdAt,
        updatedAt: updatedRolePermission!.updatedAt,
        deletedAt: updatedRolePermission!.deletedAt,
        isDeleted: updatedRolePermission!.isDeleted,
      },
      "با موفقیت بروزرسانی شد",
      HttpStatusCode.CREATED,
    );
  }

  async deleteRolePermission(id: string): Promise<Result<string>> {
    var rolePermission = await this.repository.getById(id);

    if (!rolePermission || rolePermission.isDeleted) {
      return Result.failure("رکورد یافت نشد", HttpStatusCode.NOT_FOUND);
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    await this.repository.updateEntity(
      { id } as any,
      {
        isDeleted: true,
        deletedAt: now,
        updatedAt: now,
      } as any,
    );

    return Result.success(id, "با موفقیت حذف شد", HttpStatusCode.CREATED);
  }

  async addPermissionToRole(
    roleId: string,
    permissionId: string,
  ): Promise<Result<string>> {
    var rolePermissions = this.repository.createQueryBuilder("rolePermission");

    rolePermissions.where("rolePermission.roleId = :roleId", { roleId });
    rolePermissions.andWhere("rolePermission.permissionId = :permissionId", {
      permissionId,
    });
    rolePermissions.andWhere("rolePermission.isDeleted = :isDeleted", {
      isDeleted: false,
    });

    var existingRolePermission = await rolePermissions.getOne();

    if (existingRolePermission) {
      return Result.failure(
        "این دسترسی قبلا برای این نقش ثبت شده است",
        HttpStatusCode.CONFLICT,
      );
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    var rolePermissionEntity = Object.assign(new RolePermission(), {
      roleId,
      permissionId,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    });

    var createdRolePermission =
      await this.repository.createEntity(rolePermissionEntity);

    return Result.success(
      createdRolePermission.id,
      "دسترسی برای نقش ثبت شد",
      HttpStatusCode.CREATED,
    );
  }

  async deletePermissionFromRole(
    roleId: string,
    permissionId: string,
  ): Promise<Result<string>> {
    var rolePermissions = this.repository.createQueryBuilder("rolePermission");

    rolePermissions.where("rolePermission.roleId = :roleId", { roleId });
    rolePermissions.andWhere("rolePermission.permissionId = :permissionId", {
      permissionId,
    });
    rolePermissions.andWhere("rolePermission.isDeleted = :isDeleted", {
      isDeleted: false,
    });

    var rolePermission = await rolePermissions.getOne();

    if (!rolePermission) {
      return Result.failure("رکورد یافت نشد", HttpStatusCode.NOT_FOUND);
    }

    var now = this.dateService.convertTimestampToPersian(Date.now());

    await this.repository.updateEntity(
      { id: rolePermission.id } as any,
      {
        isDeleted: true,
        deletedAt: now,
        updatedAt: now,
      } as any,
    );

    return Result.success(
      rolePermission.id,
      "دسترسی از نقش حذف شد",
      HttpStatusCode.CREATED,
    );
  }
}
