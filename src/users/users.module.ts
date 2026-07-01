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
      // Registramos el TreeRepository usando el token estándar de TypeORM.
      // Esto permite que @InjectRepository(User) en tu servicio funcione perfectamente.
      provide: getRepositoryToken(User),
      useFactory: (dataSource: DataSource) => dataSource.getTreeRepository(User),
      inject: [DataSource],
    },
  ],
  exports: [
    UsersService, 
    TypeOrmModule // Exportamos el módulo para que la entidad User esté disponible
  ],
})
export class UsersModule {}