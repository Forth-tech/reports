import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../common/services/audit.service';
import { PrismaService } from '../common/services/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService, AuditService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
