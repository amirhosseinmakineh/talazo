import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../Core/baseModule/auth/auth.module";
import { SharedModule } from "../shared/shared.Module";
import { appConfig, authConfig, databaseConfig } from "../config/env";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    SharedModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...databaseConfig(),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}
