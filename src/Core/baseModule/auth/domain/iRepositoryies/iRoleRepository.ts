import { FindOptionsWhere } from "typeorm";
import { IBaseRepository } from "../../../../domain/iBaseRepository";
import { Role } from "../entities/role";
import { Injectable } from "@nestjs/common";
Injectable()
export interface IRoleRepository extends IBaseRepository<string, Role> {
     existsByRoleName(roleName : string):Promise<boolean>;
}
