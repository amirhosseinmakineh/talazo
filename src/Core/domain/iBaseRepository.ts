import { DeepPartial, FindOptionsWhere, ObjectLiteral, SelectQueryBuilder } from "typeorm";

export interface IBaseRepository<Tkey, TEntity extends ObjectLiteral> {
  createEntity(entity: TEntity): Promise<TEntity>;
  updateEntity(
    criteria: FindOptionsWhere<TEntity>,
    partialEntity: DeepPartial<TEntity>
  ): Promise<void>;
  deleteEntity(id: Tkey): Promise<void>;
  getAll(): Promise<TEntity[]>;
  getById(id: Tkey): Promise<TEntity | null>;
  createQueryBuilder(alias: string): SelectQueryBuilder<TEntity>;
  findOneBy(criteria: FindOptionsWhere<TEntity>): Promise<TEntity | null>;
  existsBy(criteria: FindOptionsWhere<TEntity>): Promise<boolean>;
}
