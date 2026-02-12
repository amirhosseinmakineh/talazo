import { BaseRepository } from "../../../../Core/infra/baseRepository";
import { Role } from "../../domain/entities/role";
import { IRoleRepository } from "../../domain/iRepositoryies/iRoleRepository";
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
