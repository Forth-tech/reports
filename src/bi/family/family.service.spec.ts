import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/bi/family/family.service.spec.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/family/family.service.spec.ts
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
