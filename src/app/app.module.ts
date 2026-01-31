import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',  
      host: '127.0.0.1', 
      port: 5432,    
      username: 'postgres',
      password: '',     
      database: 'postgres', 
      autoLoadEntities: true,
      synchronize: true, 
    }),

    AuthModule, 
  ],
})
export class AppModule {}
