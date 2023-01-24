import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/services/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService],
    }).compile();

    controller = module.get<CityController>(CityController);
    prisma = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
