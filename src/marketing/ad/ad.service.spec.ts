import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/marketing/ad/ad.service.spec.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/ad/ad.service.spec.ts
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
