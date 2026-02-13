import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { databaseConfig } from "../../config/env";

const db = databaseConfig();

export const AppDataSource = new DataSource({
  ...db,
  entities: ["src/**/*.entity{.ts,.js}", "src/**/domain/entities/*{.ts,.js}"],
  migrations: ["src/Core/infra/migrations/*{.ts,.js}"],
  synchronize: false,
});
