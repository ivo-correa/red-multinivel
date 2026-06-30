import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { User } from './users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RegisterController } from './auth/register.controller';

@Module({
  imports: [
    // 1. Configuración centralizada
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, __dirname + '/**/*.entity{.ts,.js}'], // Asegura que encuentre todas las entidades
      synchronize: false,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        connectionTimeoutMillis: 10000,
      },
      autoLoadEntities: true, 
    }),
    
    // 2. Eliminamos forFeature([User]) de aquí, 
    // debe estar solo en los módulos hijos (UsersModule)
    
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