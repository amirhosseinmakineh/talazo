import { DeepPartial, FindOptionsWhere } from "typeorm";

export interface IBaseRepository<Tkey,TEntity> {
     createEntity(entity: TEntity): Promise<TEntity>;
     updateEntity(criteria: FindOptionsWhere<TEntity>, partialEntity: DeepPartial<TEntity>): Promise<void>;
     deleteEntity(id: Tkey): Promise<void>;
     getAll(): Promise<TEntity[]>;
     getById(id : Tkey) : Promise<TEntity | null>;
}
