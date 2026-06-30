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
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
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