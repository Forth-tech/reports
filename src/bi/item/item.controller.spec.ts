import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../common/services/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService, PrismaService, AuditService],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
