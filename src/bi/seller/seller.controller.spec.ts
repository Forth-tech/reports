import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../common/services/prisma.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

describe('SellerController', () => {
  let controller: SellerController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [SellerService, PrismaService, AuditService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
