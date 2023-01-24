import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { PrismaService } from '../../common/services/prisma.service';

@Module({
  controllers: [NetworkController],
  providers: [NetworkService, PrismaService],
})
export class NetworkModule {}
