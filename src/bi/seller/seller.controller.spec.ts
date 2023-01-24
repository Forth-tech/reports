import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/bi/seller/seller.controller.spec.ts
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../common/services/prisma.service';
=======
import { AuditService } from '../common/services/audit.service';
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/seller/seller.controller.spec.ts
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
