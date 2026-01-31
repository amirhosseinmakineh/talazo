import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1769543443547 implements MigrationInterface {
    name = 'CreateDatabase1769543443547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "key" character varying(120) NOT NULL, "permissionName" character varying(120) NOT NULL, "moduleKey" character varying(64), CONSTRAINT "UQ_017943867ed5ceef9c03edd9745" UNIQUE ("key"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying(64) NOT NULL, "passwordHash" character varying(255) NOT NULL, "mobileNumber" character varying(11), "userStatus" smallint NOT NULL DEFAULT '1', "refreshTokenHash" character varying(255), "refreshTokenExpiresAt" TIMESTAMP, "passwordResetTokenHash" character varying(255), "passwordResetExpiresAt" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_61dc14c8c49c187f5d08047c985" UNIQUE ("mobileNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "roleName" character varying(64) NOT NULL, "moduleKey" character varying(64), "userId" uuid, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8dd57347808f41ad61c91a5460" ON "roles" ("moduleKey", "roleName") `);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d430a02aad006d8a70f3acd7d0" ON "role_permissions" ("roleId", "permissionId") `);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_c8db5603420d119933bbc5c398c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_c8db5603420d119933bbc5c398c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d430a02aad006d8a70f3acd7d0"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8dd57347808f41ad61c91a5460"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
