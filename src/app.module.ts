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
      entities: [User, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      ssl: { rejectUnauthorized: false },
      extra: { connectionTimeoutMillis: 10000 },
      autoLoadEntities: true, 
    }),
    UsersModule,
    NetworkModule,
  ],
  controllers: [AuthController, RegisterController],
  providers: [],
})
export class AppModule {}