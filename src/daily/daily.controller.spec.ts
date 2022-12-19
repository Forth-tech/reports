import { Test, TestingModule } from '@nestjs/testing';
import { DailyController } from './daily.controller';
import { DailyService } from './daily.service';

describe('DailyController', () => {
  let controller: DailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyController],
      providers: [DailyService],
    }).compile();

    controller = module.get<DailyController>(DailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
