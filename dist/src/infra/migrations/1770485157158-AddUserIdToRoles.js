"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserIdToRoles1770485157158 = void 0;
class AddUserIdToRoles1770485157158 {
    constructor() {
        this.name = 'AddUserIdToRoles1770485157158';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_8dd57347808f41ad61c91a5460"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_c8db5603420d119933bbc5c398c"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_923b2af407cadc21e9d4231a17" ON "roles" ("userId", "moduleKey", "roleName") `);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_c8db5603420d119933bbc5c398c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_c8db5603420d119933bbc5c398c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_923b2af407cadc21e9d4231a17"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_c8db5603420d119933bbc5c398c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8dd57347808f41ad61c91a5460" ON "roles" ("moduleKey", "roleName") `);
    }
}
exports.AddUserIdToRoles1770485157158 = AddUserIdToRoles1770485157158;
//# sourceMappingURL=1770485157158-AddUserIdToRoles.js.map