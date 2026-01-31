import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateDatabase1769543443547 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
