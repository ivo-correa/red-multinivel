import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NetworkModule } from '../network/network.module'; // Restaurado

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    NetworkModule, // Restaurado
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      // Proporcionamos el TreeRepository explícitamente para evitar el error UnknownDependenciesException
      provide: getRepositoryToken(User),
      useFactory: (dataSource: DataSource) => {
        return dataSource.getTreeRepository(User);
      },
      inject: [DataSource],
    },
  ],
  exports: [UsersService], // Exportamos el servicio por si otros módulos lo usan
})
export class UsersModule {}