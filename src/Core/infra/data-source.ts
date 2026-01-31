import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',   // ✅ مهم‌ترین خط
  port: 5432,
  username: 'postgres',
  password: '1234',    // همون پسورد Navicat
  database: 'talazo',

  entities: [
    'src/**/*.entity{.ts,.js}',
    'src/**/domain/entities/*{.ts,.js}',
  ],
  migrations: ['src/core/infra/migrations/*{.ts,.js}'],
  synchronize: false,
});


