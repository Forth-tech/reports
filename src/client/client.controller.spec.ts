import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService, PrismaService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const client = await controller.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      expect(client).toBeDefined();
      expect(client.message).toEqual('Client created');
      expect(client.data.name).toEqual('Client 1');
      expect(client.data.internalCode).toEqual('C1');
      expect(client.data).toHaveProperty('id');
    });

    it('Should throw an error if same internalCode is used', async () => {
      await controller.create({
        name: 'Client 1',
        internalCode: 'C1',
      });

      await expect(
        controller.create({
          name: 'Client 2',
          internalCode: 'C1',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const clients = await controller.findAll();

      expect(clients).toBeDefined();
      expect(clients.data).toHaveLength(0);
    });

    it('should return all clients', async () => {
      await prisma.client.create({
        data: {
          name: 'Client 1',
          internalCode: 'C1',
        },
      });

      await prisma.client.create({
        data: {
          name: 'Client 2',
          internalCode: 'C2',
        },
      });

      const clients = await controller.findAll();

      expect(clients).toBeDefined();
      expect(clients.data).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a client', async () => {
      const client = await prisma.client.create({
        data: {
          name: 'Client 1',
          internalCode: 'C1',
        },
      });

      const foundClient = await controller.findOne(client.id);

      expect(foundClient).toBeDefined();
      expect(foundClient.data.name).toEqual('Client 1');
      expect(foundClient.data.internalCode).toEqual('C1');
      expect(foundClient.data).toHaveProperty('id');
    });

    it('should throw an error if client does not exist', async () => {
      await expect(controller.findOne(1)).rejects.toThrow();
    });
  });
});
