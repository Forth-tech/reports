import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/services/prisma.service';
import { FamilyService } from './family.service';

describe('FamilyService', () => {
  let service: FamilyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyService, PrismaService],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
