import { Module } from '@nestjs/common';
import { DailyService } from './daily.service';
import { DailyController } from './daily.controller';

@Module({
  controllers: [DailyController],
  providers: [DailyService]
})
export class DailyModule {}
