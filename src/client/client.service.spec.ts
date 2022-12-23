import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, PrismaService],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const client = await service.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      expect(client).toBeDefined();
      expect(client.name).toEqual('Client 1');
      expect(client.internalCode).toEqual('C1');
      expect(client).toHaveProperty('id');
    });

    it('Should throw an error if same internalCode is used', async () => {
      await service.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      await expect(
        service.create({
          name: 'Client 2',
          internalCode: 'C1',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const clients = await service.findAll();

      expect(clients).toBeDefined();
      expect(clients).toHaveLength(0);
    });
    it('should return all clients', async () => {
      await service.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      await service.create({
        name: 'Client 2',
        internalCode: 'C2',
      });

      const clients = await service.findAll();

      expect(clients).toBeDefined();
      expect(clients).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a client', async () => {
      const client = await service.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      const foundClient = await service.findOne(client.id);

      expect(foundClient).toBeDefined();
      expect(foundClient).toEqual(client);
    });

    it('should return null if client is not found', async () => {
      const client = await service.findOne(999);

      expect(client).toBeNull();
    });
  });
});
