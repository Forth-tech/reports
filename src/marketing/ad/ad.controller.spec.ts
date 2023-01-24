import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/marketing/ad/ad.controller.spec.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/ad/ad.controller.spec.ts
import { AdController } from './ad.controller';
import { AdService } from './ad.service';

describe('AdController', () => {
  let controller: AdController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdController],
      providers: [AdService, PrismaService],
    }).compile();

    controller = module.get<AdController>(AdController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
