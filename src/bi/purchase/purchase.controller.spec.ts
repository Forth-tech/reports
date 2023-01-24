import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../common/services/prisma.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

describe('PurchaseController', () => {
  let controller: PurchaseController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [PurchaseService, PrismaService, AuditService],
    }).compile();

    controller = module.get<PurchaseController>(PurchaseController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
