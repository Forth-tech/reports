import { Test, TestingModule } from '@nestjs/testing';
import { DailyResultsService } from './daily-results.service';

describe('DailyResultsService', () => {
  let service: DailyResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyResultsService],
    }).compile();

    service = module.get<DailyResultsService>(DailyResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
