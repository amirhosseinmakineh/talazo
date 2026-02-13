import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { RolePermission } from "../entities/rolePermission";
import { Injectable } from "@nestjs/common";
Injectable()
export interface IRolePermissionRepository
  extends IBaseRepository<string, RolePermission> 
  {
  }
