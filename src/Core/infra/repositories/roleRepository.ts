import { BaseRepository } from "../baseRepository";
import { Role } from "../../../Core/baseModule/auth/domain/entities/role";
import { IRoleRepository } from "../../baseModule/auth/domain/iRepositoryies/iRoleRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class RoleRepository extends BaseRepository<string, Role>
     implements IRoleRepository {
          constructor(@InjectRepository(Role) repo : Repository<Role>){
               super(repo)
          }
          async existsByRoleName(roleName: string): Promise<boolean> {
          return await this.repository.exists({where: { roleName }
          });
          }

}
