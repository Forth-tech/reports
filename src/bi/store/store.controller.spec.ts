import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../common/services/prisma.service';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

describe('StoreController', () => {
  let controller: StoreController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService, PrismaService, AuditService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
