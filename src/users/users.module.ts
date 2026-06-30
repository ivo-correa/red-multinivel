import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    NetworkModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      // Esto registra el TreeRepository para que el servicio lo encuentre
      provide: getRepositoryToken(User),
      useFactory: (dataSource: DataSource) => dataSource.getTreeRepository(User),
      inject: [DataSource],
    },
    // Añadimos esto para que si el RegisterController busca "UserRepository"
    // NestJS sepa que debe darle el mismo TreeRepository
    {
      provide: 'UserRepository', 
      useExisting: getRepositoryToken(User),
    },
  ],
  exports: [
    UsersService, 
    'UserRepository', // Exportamos el alias para que RegisterController pueda usarlo
    TypeOrmModule
  ],
})
export class UsersModule {}