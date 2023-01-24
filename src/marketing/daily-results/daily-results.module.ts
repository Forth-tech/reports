import { Module } from '@nestjs/common';
import { DailyResultsService } from './daily-results.service';
import { DailyResultsController } from './daily-results.controller';

@Module({
  controllers: [DailyResultsController],
  providers: [DailyResultsService],
})
export class DailyResultsModule {}
