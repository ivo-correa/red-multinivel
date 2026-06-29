import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { User } from './users/entities/user.entity';
import { AuthController } from './auth.controller';
import { RegisterController } from './auth/register.controller'; // Importa el nuevo controlador

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'red_multinivel_pro',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    // Esta línea es CRÍTICA: permite que los controladores usen UserRepository
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