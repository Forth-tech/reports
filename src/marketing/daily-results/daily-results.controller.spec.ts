import { Test, TestingModule } from '@nestjs/testing';
import { DailyResultsController } from './daily-results.controller';
import { DailyResultsService } from './daily-results.service';

describe('DailyResultsController', () => {
  let controller: DailyResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyResultsController],
      providers: [DailyResultsService],
    }).compile();

    controller = module.get<DailyResultsController>(DailyResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
