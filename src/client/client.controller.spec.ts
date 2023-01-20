import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../common/services/audit.service';
import { PrismaService } from '../common/services/prisma.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService, PrismaService, AuditService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
