import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserClosure } from './entities/user-closure.entity'; // Importa la nueva entidad
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [
    // Registramos AMBAS entidades para que el servicio pueda usarlas
    TypeOrmModule.forFeature([User, UserClosure]), 
    NetworkModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}