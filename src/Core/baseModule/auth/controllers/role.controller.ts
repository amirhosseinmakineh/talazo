import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { IRoleService } from "../contracts/iRoleService";
import {
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../requests/role/createRoleRequest";

@Controller("roles")
export class RoleController {
  constructor(private readonly service: IRoleService) {}

  @Get()
  getAllRoles(
    @Query("cursor") cursor: string | null = null,
    @Query("limit") limit = 10,
  ) {
    return this.service.getAllRoles(cursor, Number(limit));
  }

  @Post()
  createRole(@Body() request: CreateRoleRequest) {
    return this.service.createRole(request);
  }

  @Put()
  updateRole(@Body() request: UpdateRoleRequest) {
    return this.service.updateRole(request);
  }

  @Delete(":roleId")
  deleteRole(@Param("roleId") roleId: string) {
    return this.service.deleteRole(roleId);
  }

  @Post("assign")
  addRoleToUser(
    @Body("userId") userId: string,
    @Body("roleName") roleName: string,
    @Body("moduleKey") moduleKey?: string,
  ) {
    return this.service.addRoleToUser(userId, roleName, moduleKey);
  }
}
