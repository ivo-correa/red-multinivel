import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'; // Cambiamos el import
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NetworkModule } from '../network/network.module';
import { DataSource } from 'typeorm'; // Necesitamos esto para la factory

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User), // Usamos el token estándar
      useFactory: (dataSource: DataSource) => dataSource.getTreeRepository(User),
      inject: [DataSource], // Inyectamos el DataSource principal
    },
  ],
})
export class UsersModule {}