import {
  DeepPartial,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { BaseEntity } from "../domain/base.Entity";
import { IBaseRepository } from "../domain/iBaseRepository";

export class BaseRepository<Tkey, TEntity extends BaseEntity>
  implements IBaseRepository<Tkey, TEntity>
{
  protected readonly repository: Repository<TEntity>;

  constructor(repository: Repository<TEntity>) {
    this.repository = repository;
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<TEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async createEntity(entity: TEntity): Promise<TEntity> {
    const created = this.repository.create(entity);
    return await this.repository.save(created);
  }

  async updateEntity(
    criteria: FindOptionsWhere<TEntity>,
    partialEntity: DeepPartial<TEntity>
  ): Promise<void> {
    await this.repository.update(criteria, partialEntity as any);
  }

  async deleteEntity(id: Tkey): Promise<void> {
    await this.repository.update({ id } as any, { isDeleted: true } as any);
  }

  async getAll(): Promise<TEntity[]> {
    return await this.repository.find({
      where: { isDeleted: false } as any,
    });
  }

  async getById(id: Tkey): Promise<TEntity | null> {
    return await this.repository.findOne({
      where: { id, isDeleted: false } as any,
    });
  }

  async findOneBy(criteria: FindOptionsWhere<TEntity>): Promise<TEntity | null> {
    return await this.repository.findOne({ where: criteria });
  }

  async existsBy(criteria: FindOptionsWhere<TEntity>): Promise<boolean> {
    const count = await this.repository.count({ where: criteria });
    return count > 0;
  }
}
