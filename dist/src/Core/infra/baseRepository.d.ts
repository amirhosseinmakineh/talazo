import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { BaseEntity } from '../domain/base.Entity';
import { IBaseRepository } from '../domain/iBaseRepository';
export declare class BaseRepository<Tkey, TEntity extends BaseEntity> implements IBaseRepository<Tkey, TEntity> {
    protected readonly repository: Repository<TEntity>;
    private readonly state;
    constructor(repository: Repository<TEntity>);
    createEntity(entity: TEntity): Promise<TEntity>;
    updateEntity(criteria: FindOptionsWhere<TEntity>, partialEntity: DeepPartial<TEntity>): Promise<void>;
    deleteEntity(id: Tkey): Promise<void>;
    getAll(): Promise<TEntity[]>;
    getById(id: Tkey): Promise<TEntity | null>;
}
