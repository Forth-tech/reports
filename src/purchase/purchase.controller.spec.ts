import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

describe('PurchaseController', () => {
  let controller: PurchaseController;
  let prisma: PrismaService;
  let id_state, id_city, id_seller, id_client, id_store: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [PurchaseService, PrismaService],
    }).compile();

    controller = module.get<PurchaseController>(PurchaseController);
    prisma = module.get<PrismaService>(PrismaService);

    // Create a Store and a Seller before each test
    id_state = (
      await prisma.state.create({
        data: {
          name: 'State',
        },
      })
    ).id;

    id_city = (
      await prisma.city.create({
        data: {
          name: 'City',
          id_state: id_state,
        },
      })
    ).id;

    id_seller = (
      await prisma.seller.create({
        data: {
          name: 'Seller',
          internalCode: 'Seller',
        },
      })
    ).id;

    id_client = (
      await prisma.client.create({
        data: {
          name: 'Client',
          internalCode: 'Client',
        },
      })
    ).id;

    id_store = (
      await prisma.store.create({
        data: {
          name: 'Store',
          internalCode: 'Store',
          id_city: id_city,
          id_seller: id_seller,
          id_client: id_client,
        },
      })
    ).id;
  });

  // Clean the table after each test
  afterEach(async () => {
    await prisma.purchase.deleteMany();
    await prisma.store.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.client.deleteMany();
    await prisma.city.deleteMany();
    await prisma.state.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase', async () => {
      const purchase = await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      expect(purchase.data).toBeDefined();
    });

    it('should throw an error if the purchase already exists', async () => {
      await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      await expect(
        controller.create({
          internalCode: 'Purchase',
          id_seller: id_seller,
          id_store: id_store,
          nf: '1',
        }),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of purchases', async () => {
      await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const purchases = await controller.findAll();
      expect(purchases.data).toBeInstanceOf(Array);
    });

    it('should return an empty array if there are no purchases', async () => {
      const purchases = await controller.findAll();
      expect(purchases.data).toEqual([]);
    });

    it('should return an array filtered by seller', async () => {
      await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const purchases = await controller.findAll({
        id_seller: id_seller,
      });
      expect(purchases.data).toBeInstanceOf(Array);
    });

    it('should return an array filtered by store', async () => {
      await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const purchases = await controller.findAll({
        id_store: id_store,
      });
      expect(purchases.data).toBeInstanceOf(Array);
    });

    it('should return an array filtered by seller and store', async () => {
      await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const purchases = await controller.findAll({
        id_seller: id_seller,
        id_store: id_store,
      });
      expect(purchases.data).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a purchase', async () => {
      const purchase = await controller.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const foundPurchase = await controller.findOne(purchase.data.id);
      expect(foundPurchase.data).toBeDefined();
    });

    it('should throw an error if the purchase does not exist', async () => {
      await expect(controller.findOne(1)).toBe(null);
    });
  });
});
