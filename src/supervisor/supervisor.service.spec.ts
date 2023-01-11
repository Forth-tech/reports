import { Test, TestingModule } from '@nestjs/testing';
import { Supervisor } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { SupervisorService } from './supervisor.service';

const supervisorOne = 'supervisorOne';
const supervisorOneId = 1;

const supervisorArray: Supervisor[] = [
  {
    name: supervisorOne,
    id: supervisorOneId,
    internalCode: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'supervisorTwo',
    id: 2,
    internalCode: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const oneSupervisor: Supervisor = supervisorArray[0];

const db = {
  supervisor: {
    findMany: jest.fn().mockResolvedValue(supervisorArray),
    findUnique: jest.fn().mockResolvedValue(oneSupervisor),
    create: jest.fn().mockResolvedValue(oneSupervisor),
  },
};

describe('SupervisorService', () => {
  let service: SupervisorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupervisorService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<SupervisorService>(SupervisorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all supervisors', async () => {
      const result = await service.findAll();
      expect(result).toEqual(supervisorArray);
    });
  });

  describe('findOne', () => {
    it('should get one supervisor', async () => {
      const supervisor = await service.findOne(supervisorOneId);
      expect(supervisor).toEqual(oneSupervisor);
    });
  });

  describe('create', () => {
    it('should create a supervisor', async () => {
      const supervisor = await service.create({
        name: supervisorOne,
        internalCode: '1',
      });
      expect(supervisor).toEqual(oneSupervisor);
    });
  });

  describe('map supervisor to supervisor out', () => {
    it('should return supervisor out when supervisor is passed', () => {
      const supervisorOut = service.mapSupervisorToSupervisorOut(oneSupervisor);

      expect(supervisorOut).toBeDefined();
      expect(supervisorOut).not.toHaveProperty('updatedAt');
      expect(supervisorOut).not.toHaveProperty('createdAt');
      expect(supervisorOut.name).toBe(supervisorOne);
    });
  });
});
