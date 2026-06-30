import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserClosure } from './entities/user-closure.entity'; 
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [
    // Comentamos la carga de entidades para el diagnóstico del servidor
    
    TypeOrmModule.forFeature([User, UserClosure]), 
    
    NetworkModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}