"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const entityState_1 = require("../domain/entityState");
class BaseRepository {
    constructor(repository) {
        this.state = entityState_1.EntityState.none;
        this.repository = repository;
    }
    async createEntity(entity) {
        debugger;
        var entity = this.repository.create(entity);
        this.repository.save(entity);
        return entity;
    }
    async updateEntity(criteria, partialEntity) {
        const entity = await this.repository.findOne({ where: criteria });
        if (!entity)
            return;
        await this.repository.update(criteria, partialEntity);
    }
    async deleteEntity(id) {
        const entity = await this.repository
            .findOne({ where: { id: id } });
        if (entity != null) {
            entity.isDeleted = true;
        }
    }
    async getAll() {
        return await this.repository
            .find({ where: { isDeleted: false } });
    }
    async getById(id) {
        return await this.repository
            .findOne({ where: { id: id } });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map