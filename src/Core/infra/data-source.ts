import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "talazo",

  entities: [
    "src/**/*.entity{.ts,.js}",
    "src/**/domain/entities/*{.ts,.js}",
  ],

  migrations: ["src/infra/migrations/*{.ts,.js}"],
  synchronize: false,
});

