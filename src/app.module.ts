import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { User } from './users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RegisterController } from './auth/register.controller';

@Module({
  imports: [
    // 1. Configuración de conexión única y centralizada
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      synchronize: false,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        connectionTimeoutMillis: 10000,
      },
      // Habilitar esto ayuda a evitar errores de inyección en tiempo de carga
      autoLoadEntities: true, 
    }),
    
    // 2. Registramos entidades globales si es necesario, 
    // pero recuerda que cada módulo debe registrar sus propias entidades
    TypeOrmModule.forFeature([User]), 
    
    UsersModule,
    NetworkModule,
  ],
  controllers: [
    AuthController, 
    RegisterController
  ],
  providers: [],
})
export class AppModule {}