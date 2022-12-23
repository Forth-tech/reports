import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

describe('SellerController', () => {
  let controller: SellerController;
  let prisma: PrismaService;
  let id_supervisor: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [SellerService, PrismaService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
    prisma = module.get<PrismaService>(PrismaService);

    id_supervisor = (
      await prisma.seller.create({
        data: {
          name: 'Supervisor',
          internalCode: 'Supervisor',
        },
      })
    ).id;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [SellerService, PrismaService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.seller.deleteMany();
    await prisma.$disconnect();
  });

  afterAll(async () => {
    await prisma.seller.deleteMany();
    await prisma.supervisor.deleteMany();
    await prisma.$disconnect();
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a seller', async () => {
      const seller = await controller.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      expect(seller.data).toHaveProperty('id');
      expect(seller.data).toHaveProperty('name', 'Seller');
      expect(seller.data).toHaveProperty('internalCode', 'Seller');
      expect(seller.data).toHaveProperty('id_supervisor', id_supervisor);
    });

    it('should throw an error if the seller already exists', async () => {
      await controller.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      await expect(
        controller.create({
          name: 'Seller',
          internalCode: 'Seller',
          id_supervisor: id_supervisor,
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if the supervisor does not exist', async () => {
      await expect(
        controller.create({
          name: 'Seller',
          internalCode: 'Seller',
          id_supervisor: 0,
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of sellers', async () => {
      await controller.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const sellers = await controller.findAll();

      expect(sellers.data).toHaveLength(1);
      expect(sellers.data[0]).toHaveProperty('id');
      expect(sellers.data[0]).toHaveProperty('name', 'Seller');
      expect(sellers.data[0]).toHaveProperty('internalCode', 'Seller');
      expect(sellers.data[0]).toHaveProperty('id_supervisor', id_supervisor);
    });

    it('should return an empty array if there are no sellers', async () => {
      const sellers = await controller.findAll();

      expect(sellers.data).toHaveLength(0);
    });

    it('should return an array of sellers filtered by supervisor', async () => {
      await controller.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const sellers = await controller.findAll({id_supervisor: id_supervisor});

      expect(sellers.data).toHaveLength(1);
      expect(sellers.data[0]).toHaveProperty('id');
      expect(sellers.data[0]).toHaveProperty('name', 'Seller');
      expect(sellers.data[0]).toHaveProperty('internalCode', 'Seller');
      expect(sellers.data[0]).toHaveProperty('id_supervisor', id_supervisor);
    });
  });

  describe('findOne', () => {
    it('should return a seller', async () => {
      const seller = await controller.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const foundSeller = await controller.findOne(seller.data.id);

      expect(foundSeller.data).toHaveProperty('id');
      expect(foundSeller.data).toHaveProperty('name', 'Seller');
      expect(foundSeller.data).toHaveProperty('internalCode', 'Seller');
      expect(foundSeller.data).toHaveProperty('id_supervisor', id_supervisor);
    });

    it('should throw an error if the seller does not exist', async () => {
      await expect(controller.findOne(0)).rejects.toThrow();
    });
  });
});
