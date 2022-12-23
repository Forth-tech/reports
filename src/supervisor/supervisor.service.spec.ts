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

  afterEach(async () => {
    const deleteAllSupervisor = prisma.supervisor.deleteMany;
    
    await deleteAllSupervisor();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a supervisor', async () => {
      const supervisor = await service.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.name).toEqual('Test Supervisor');
    });

    it('should not create a supervisor with the same internalCode', async () => {
      const supervisor = await service.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.name).toEqual('Test Supervisor');

      await expect(service.create({
        name: 'Test Supervisor 2',
        internalCode: 'Test Supervisor',
      })).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const supervisors = await service.findAll();

      expect(supervisors).toBeDefined();
      expect(supervisors.length).toEqual(0);
    });

    it('should find all supervisors', async () => {
      const supervisor = await service.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.name).toEqual('Test Supervisor');

      const supervisors = await service.findAll();

      expect(supervisors).toBeDefined();
      expect(supervisors.length).toEqual(1);
    });
  });

  describe('findOne', () => {
    it('should find a supervisor', async () => {
      const supervisor = await service.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.name).toEqual('Test Supervisor');

      const supervisor2 = await service.findOne(supervisor.id);

      expect(supervisor2).toBeDefined();
      expect(supervisor2.name).toEqual('Test Supervisor');
    });
  });
});
