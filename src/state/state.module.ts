import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [StateController],
  providers: [StateService, PrismaService],
})
export class StateModule {}
