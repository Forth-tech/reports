import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/bi/item/item.service.spec.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/item/item.service.spec.ts
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, PrismaService],
    }).compile();

    service = module.get<ItemService>(ItemService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
