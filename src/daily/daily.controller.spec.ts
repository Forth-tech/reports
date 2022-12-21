import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { DailyController } from './daily.controller';
import { DailyService } from './daily.service';

describe('DailyController', () => {
  let controller: DailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyController],
      providers: [DailyService, PrismaService],
    }).compile();

    controller = module.get<DailyController>(DailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
