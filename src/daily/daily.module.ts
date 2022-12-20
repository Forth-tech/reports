import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { DailyController } from './daily.controller';
import { DailyService } from './daily.service';

@Module({
  controllers: [DailyController],
  providers: [DailyService, PrismaService],
})
export class DailyModule {}
