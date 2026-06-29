import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkService } from './network.service';
import { NetworkRelation } from './entities/network.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NetworkRelation])],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}