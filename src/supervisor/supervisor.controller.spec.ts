import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from '../common/services/audit.service';
import { PrismaService } from '../common/services/prisma.service';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';

describe('SupervisorController', () => {
  let controller: SupervisorController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupervisorController],
      providers: [SupervisorService, PrismaService, AuditService],
    }).compile();

    controller = module.get<SupervisorController>(SupervisorController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
