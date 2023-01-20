import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { PrismaService } from '../common/services/prisma.service';
import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {
  let service: SupervisorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupervisorService, PrismaService],
    }).compile();

    service = module.get<SupervisorService>(SupervisorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
