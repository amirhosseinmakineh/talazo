import {
  DeepPartial,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { BaseEntity } from "../domain/base.Entity";
import { IBaseRepository } from "../domain/iBaseRepository";

export class BaseRepository<
  Tkey,
  TEntity extends BaseEntity,
> implements IBaseRepository<Tkey, TEntity> {
  protected readonly repository: Repository<TEntity>;

  constructor(repository: Repository<TEntity>) {
    this.repository = repository;
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<TEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async createEntity(entity: TEntity): Promise<TEntity> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  async updateEntity(
    criteria: FindOptionsWhere<TEntity>,
    partialEntity: DeepPartial<TEntity>,
  ): Promise<void> {
    await this.repository.update(criteria, partialEntity);
  }

  async deleteEntity(id: Tkey): Promise<void> {
    const deleteCriteria = { id } as unknown as FindOptionsWhere<TEntity>;
    const deletePayload = {
      isDeleted: true,
    } as unknown as DeepPartial<TEntity>;
    await this.repository.update(deleteCriteria, deletePayload);
  }

  async getAll(): Promise<TEntity[]> {
    return this.repository.find({
      where: { isDeleted: false } as unknown as FindOptionsWhere<TEntity>,
    });
  }

  async getById(id: Tkey): Promise<TEntity | null> {
    return this.repository.findOne({
      where: { id, isDeleted: false } as unknown as FindOptionsWhere<TEntity>,
    });
  }

  async findOneBy(
    criteria: FindOptionsWhere<TEntity>,
  ): Promise<TEntity | null> {
    return this.repository.findOne({ where: criteria });
  }

  async existsBy(criteria: FindOptionsWhere<TEntity>): Promise<boolean> {
    const count = await this.repository.count({ where: criteria });
    return count > 0;
  }
}
