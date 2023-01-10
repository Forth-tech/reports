import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { AdService } from './ad.service';

describe('AdService', () => {
  let service: AdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdService, PrismaService],
    }).compile();

    service = module.get<AdService>(AdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
