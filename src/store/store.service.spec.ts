import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;
  let prisma: PrismaService;
  let id_state, id_city, id_seller, id_client: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, PrismaService],
    }).compile();

    service = module.get<StoreService>(StoreService);
    prisma = module.get<PrismaService>(PrismaService);

    // Create State, City, Client and Seller prior to each test
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
  });

  // Clean database after each test
  afterEach(async () => {
    await prisma.store.deleteMany();
    await prisma.client.deleteMany();
    await prisma.city.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.state.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a store', async () => {
      const store = await service.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      expect(store).toBeDefined();
      expect(store.name).toBe('Store');
      expect(store.internalCode).toBe('Store');
      expect(store.id_seller).toBe(id_seller);
      expect(store.id_city).toBe(id_city);
      expect(store.id_client).toBe(id_client);
    });

    it('should throw an error if the store already exists', async () => {
      await service.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      await expect(
        service.create({
          name: 'Store',
          internalCode: 'Store',
          id_seller: id_seller,
          id_city: id_city,
          id_client: id_client,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const stores = await service.findAll({});
      expect(stores).toBeDefined();
      expect(stores).toHaveLength(0);
    });

    it('should find all stores', async () => {
      const store1 = await service.create({
        name: 'Store1',
        internalCode: 'Store1',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const store2 = await service.create({
        name: 'Store2',
        internalCode: 'Store2',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await service.findAll({});

      expect(stores).toBeDefined();
      expect(stores).toHaveLength(2);
      expect(stores).toContainEqual(store1);
      expect(stores).toContainEqual(store2);
    });

    it('should find all stores by id_client', async () => {
      await prisma.client.create({
        data: {
          name: 'Client',
          internalCode: 'Client',
        },
      });

      const store1 = await service.create({
        name: 'Store1',
        internalCode: 'Store1',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const store2 = await service.create({
        name: 'Store2',
        internalCode: 'Store2',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const store3 = await service.create({
        name: 'Store3',
        internalCode: 'Store3',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client + 1,
      });

      const stores = await service.findAll({ id_client: id_client });

      expect(stores).toBeDefined();
      expect(stores).toHaveLength(2);
      expect(stores).toContainEqual(store1);
      expect(stores).toContainEqual(store2);
      expect(stores).not.toContainEqual(store3);
    });

    it('should find all stores by id_seller', async () => {
      await prisma.seller.create({
        data: {
          name: 'Seller',
          internalCode: 'Seller1',
        },
      });

      const store1 = await service.create({
        name: 'Store1',
        internalCode: 'Store1',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const store2 = await service.create({
        name: 'Store2',
        internalCode: 'Store2',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const store3 = await service.create({
        name: 'Store3',
        internalCode: 'Store3',
        id_seller: id_seller + 1,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await service.findAll({ id_seller: id_seller });

      expect(stores).toBeDefined();
      expect(stores).toHaveLength(2);
      expect(stores).toContainEqual(store1);
      expect(stores).toContainEqual(store2);
      expect(stores).not.toContainEqual(store3);

      const stores2 = await service.findAll({ id_seller: id_seller + 1 });

      expect(stores2).toBeDefined();
      expect(stores2).toHaveLength(1);
      expect(stores2).toContainEqual(store3);
      expect(stores2).not.toContainEqual(store1);
      expect(stores2).not.toContainEqual(store2);
    });
  });
});
