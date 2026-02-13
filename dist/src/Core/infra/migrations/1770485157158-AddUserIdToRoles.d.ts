import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUserIdToRoles1770485157158 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
