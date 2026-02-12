import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { IRoleService } from "../application/contracts/iRoleService";

@Controller("roles")
export class RoleController {
  constructor(private readonly service: IRoleService) {}

  @Get()
  getAllRoles() {
    return this.service.getAllRoles();
  }

  @Post()
  createRole(@Body("roleName") roleName: string) {
    return this.service.createRole(roleName);
  }

  @Put(":roleId")
  updateRole(@Param("roleId") roleId: string) {
    return this.service.updateRole(roleId);
  }

  @Delete(":roleId")
  deleteRole(@Param("roleId") roleId: string) {
    return this.service.deleteRole(roleId);
  }

  @Post("assign")
  addRoleToUser(
    @Body("userId") userId: string,
    @Body("roleName") roleName: string,
    @Body("moduleKey") moduleKey?: string
  ) {
    return this.service.addRoleToUser(userId, roleName, moduleKey);
  }
}
