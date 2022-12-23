import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let prisma: PrismaService;
  let id_state,
    id_city,
    id_seller,
    id_client,
    id_store,
    id_purchase,
    id_family,
    id_product: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService, PrismaService],
    }).compile();

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

    id_purchase = (
      await prisma.purchase.create({
        data: {
          id_store: id_store,
          id_seller: id_seller,
          internalCode: 'Purchase',
          nf: 'Purchase',
        },
      })
    ).id;

    id_family = (
      await prisma.family.create({
        data: {
          name: 'Family',
          internalCode: 'Family',
        },
      })
    ).id;

    id_product = (
      await prisma.product.create({
        data: {
          name: 'Product',
          internalCode: 'Product',
          id_family: id_family,
        },
      })
    ).id;

    await module.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService, PrismaService],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Clean the whole database after the tests
  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.family.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.store.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.client.deleteMany();
    await prisma.city.deleteMany();
    await prisma.state.deleteMany();
  });

  afterEach(async () => {
    await prisma.item.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const item = await controller.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });
      expect(item.data).toHaveProperty('id');
    });

    it('should throw error an item with a non-existent purchase', async () => {
      await expect(
        controller.create({
          id_purchase: 0,
          id_product: id_product,
          quantity: 1,
          price: 1,
        }),
      ).rejects.toThrow();
    });

    it('should throw error an item with a non-existent product', async () => {
      await expect(
        controller.create({
          id_purchase: id_purchase,
          id_product: 0,
          quantity: 1,
          price: 1,
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const item = await controller.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });
      const items = await controller.findAll();
      expect(items.data).toEqual([item.data]);
    });

    it('should return an empty array', async () => {
      const items = await controller.findAll();
      expect(items.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an item', async () => {
      const item = await controller.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });
      const itemFound = await controller.findOne(item.data.id);
      expect(itemFound.data).toEqual(item.data);
    });

    it('should throw error when item not found', async () => {
      await expect(controller.findOne(0)).rejects.toThrow();
    });
  });
});
