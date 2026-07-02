import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { User } from './users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RegisterController } from './auth/register.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      // Para la base de datos interna de Render, usualmente no se requiere SSL estricto, 
      // pero mantenemos la configuración flexible para asegurar la conexión.
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    NetworkModule,
  ],
  controllers: [AuthController, RegisterController],
  providers: [],
})
export class AppModule {}