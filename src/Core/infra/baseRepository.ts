import { Repository, FindOptionsWhere, DeepPartial, Entity } from 'typeorm';
import { BaseEntity } from '../domain/base.Entity';
import { IBaseRepository } from '../domain/iBaseRepository';
import { EntityState } from '../domain/entityState';
import e from 'express';

export class BaseRepository<Tkey, TEntity extends BaseEntity> implements IBaseRepository<Tkey,TEntity> {
    
    protected readonly repository: Repository<TEntity>;
    private readonly state : EntityState = EntityState.none;
    constructor(repository: Repository<TEntity>) {
        this.repository = repository;
    }


        async createEntity(entity: TEntity): Promise<TEntity>
        {
          debugger;
             var entity = this.repository.create(entity);
              this.repository.save(entity);
              return entity;
        }

async updateEntity(
  criteria: FindOptionsWhere<TEntity>,
  partialEntity: DeepPartial<TEntity>
): Promise<void> {
  const entity = await this.repository.findOne({ where: criteria });
  if (!entity) return;

  await this.repository.update(criteria, partialEntity as any);
}


        async deleteEntity(id: Tkey): Promise<void> 
        {
            const entity = await this.repository
            .findOne({ where: { id: id } as any});

        if (entity != null) {
            entity.isDeleted = true;
        }
    }

       async getAll(): Promise<TEntity[]> 
        {
            return await this.repository
            .find({ where: { isDeleted: false } as any });
        }

        async getById(id : Tkey) : Promise<TEntity | null>
        {
            return  await  this.repository
            .findOne({where : {id : id} as any});
        }   
}