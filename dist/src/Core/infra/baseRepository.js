"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    createQueryBuilder(alias) {
        return this.repository.createQueryBuilder(alias);
    }
    async createEntity(entity) {
        const created = this.repository.create(entity);
        return await this.repository.save(created);
    }
    async updateEntity(criteria, partialEntity) {
        await this.repository.update(criteria, partialEntity);
    }
    async deleteEntity(id) {
        await this.repository.update({ id }, { isDeleted: true });
    }
    async getAll() {
        return await this.repository.find({
            where: { isDeleted: false },
        });
    }
    async getById(id) {
        return await this.repository.findOne({
            where: { id, isDeleted: false },
        });
    }
    async findOneBy(criteria) {
        return await this.repository.findOne({ where: criteria });
    }
    async existsBy(criteria) {
        const count = await this.repository.count({ where: criteria });
        return count > 0;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map