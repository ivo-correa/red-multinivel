import { Module } from '@nestjs/common';
import { TypeOrmModule, getTreeRepositoryToken } from '@nestjs/typeorm'; // Importa el token
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    // Esto fuerza a que NestJS entienda que este repositorio es un TreeRepository
    {
      provide: getTreeRepositoryToken(User),
      useFactory: (connection) => connection.getTreeRepository(User),
      inject: ['CONNECTION'], // O el token de tu conexión
    },
  ],
})
export class UsersModule {}