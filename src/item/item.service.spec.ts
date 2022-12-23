import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let prisma: PrismaService;
  let id_state,
    id_city,
    id_seller,
    id_client,
    id_store,
    id_purchase,
    id_family,
    id_product: number;

  // Before all tests should create the following interfaces: Purchase, Product, Family, Seller, Store, Client, State, City
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          internalCode: 'Seller1',
        },
      })
    ).id;

    id_client = (
      await prisma.client.create({
        data: {
          name: 'Client',
          internalCode: 'Client1',
        },
      })
    ).id;

    id_store = (
      await prisma.store.create({
        data: {
          name: 'Store',
          internalCode: 'Store1',
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
          internalCode: 'Purchase1',
          nf: 'Purchase',
        },
      })
    ).id;

    id_family = (
      await prisma.family.create({
        data: {
          name: 'Family',
          internalCode: 'Family1',
        },
      })
    ).id;

    id_product = (
      await prisma.product.create({
        data: {
          name: 'Product',
          internalCode: 'Product1',
          id_family: id_family,
        },
      })
    ).id;

    await module.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, PrismaService],
    }).compile();

    service = module.get<ItemService>(ItemService);
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
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const item = await service.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });

      expect(item).toBeDefined();
    });

    it('should throw an error if the purchase does not exist', async () => {
      await expect(
        service.create({
          id_purchase: 0,
          id_product: id_product,
          quantity: 1,
          price: 1,
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if the product does not exist', async () => {
      await expect(
        service.create({
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
      const item = await service.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });

      const items = await service.findAll();

      expect(items).toBeDefined();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(item);
    });

    it('should return an empty array if there are no items', async () => {
      const items = await service.findAll();

      expect(items).toBeDefined();
      expect(items).toHaveLength(0);
    });

    it('should return an array of items with the given purchase id', async () => {
      const item = await service.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });

      const items = await service.findAll({ id_purchase: id_purchase });

      expect(items).toBeDefined();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(item);
    });
  });

  describe('findOne', () => {
    it('should return an item', async () => {
      const item = await service.create({
        id_purchase: id_purchase,
        id_product: id_product,
        quantity: 1,
        price: 1,
      });

      const foundItem = await service.findOne(item.id);

      expect(foundItem).toBeDefined();
      expect(foundItem).toEqual(item);
    });

    it('should expect null if the item does not exist', async () => {
      const foundItem = await service.findOne(0);
      expect(foundItem).toBeNull();
    });
  });
});
