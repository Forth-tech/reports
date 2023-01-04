import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';

describe('SupervisorController', () => {
  let controller: SupervisorController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupervisorController],
      providers: [SupervisorService, PrismaService],
    }).compile();

    controller = module.get<SupervisorController>(SupervisorController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    const deleteAllSupervisor = prisma.supervisor.deleteMany;

    await deleteAllSupervisor();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a supervisor', async () => {
      const supervisor = await controller.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.data.name).toEqual('Test Supervisor');
    });

    it('should not create a supervisor with the same internalCode', async () => {
      const supervisor = await controller.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.data.name).toEqual('Test Supervisor');

      await expect(
        controller.create({
          name: 'Test Supervisor 2',
          internalCode: 'Test Supervisor',
        }),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const supervisors = await controller.findAll();

      expect(supervisors).toBeDefined();
      expect(supervisors.data).toHaveLength(0);
    });

    it('should return a supervisor', async () => {
      const supervisor = await controller.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.data.name).toEqual('Test Supervisor');

      const supervisors = await controller.findAll();

      expect(supervisors).toBeDefined();
      expect(supervisors.data).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a supervisor', async () => {
      const supervisor = await controller.create({
        name: 'Test Supervisor',
        internalCode: 'Test Supervisor',
      });

      expect(supervisor).toBeDefined();
      expect(supervisor.data.name).toEqual('Test Supervisor');

      const supervisor2 = await controller.findOne(supervisor.data.id);

      expect(supervisor2).toBeDefined();
      expect(supervisor2.data.name).toEqual('Test Supervisor');
    });

    it('should throw error when not found', async () => {
      await expect(controller.findOne(1)).rejects.toThrowError();
    });
  });
});
