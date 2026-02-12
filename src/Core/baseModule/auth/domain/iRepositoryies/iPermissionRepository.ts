import { FindOptionsWhere } from "typeorm";
import { IBaseRepository } from "../../../../Core/domain/iBaseRepository";
import { Permission } from "../entities/permission";
import { Injectable } from "@nestjs/common";
Injectable()
export interface IPermissionRepository extends IBaseRepository<string,Permission> {
}
