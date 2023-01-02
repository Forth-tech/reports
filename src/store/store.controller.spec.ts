import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

describe('StoreController', () => {
  let controller: StoreController;
  let prisma: PrismaService;
  let id_state, id_city, id_seller, id_client: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService, PrismaService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    prisma = module.get<PrismaService>(PrismaService);

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

    module.close();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService, PrismaService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Delete State, City, Client and Seller after each test
    await prisma.city.deleteMany();
    await prisma.state.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.client.deleteMany();
  });

  afterEach(async () => {
    await prisma.store.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a store', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      expect(store).toBeDefined();
      expect(store.data.name).toEqual('Store');
      expect(store.data.internalCode).toEqual('Store');
      expect(store.data.id_seller).toEqual(id_seller);
      expect(store.data.id_city).toEqual(id_city);
      expect(store.data.id_client).toEqual(id_client);
      expect(store.data).toHaveProperty('id');
    });

    it('should throw an error if same internalCode is used', async () => {
      await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      await expect(
        controller.create({
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
    it('should return an array of stores', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await controller.findAll();

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(1);
      expect(stores.data[0].name).toEqual('Store');
      expect(stores.data[0].internalCode).toEqual('Store');
      expect(stores.data[0].id_seller).toEqual(id_seller);
      expect(stores.data[0].id_city).toEqual(id_city);
      expect(stores.data[0].id_client).toEqual(id_client);
      expect(stores.data[0]).toHaveProperty('id');
    });

    it('should return an empty array if no stores are found', async () => {
      const stores = await controller.findAll();

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(0);
    });

    it('should return an array of specific clients', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await controller.findAll({
        id_client: id_client,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(1);
      expect(stores.data[0].name).toEqual('Store');
      expect(stores.data[0].internalCode).toEqual('Store');
      expect(stores.data[0].id_seller).toEqual(id_seller);
      expect(stores.data[0].id_city).toEqual(id_city);
      expect(stores.data[0].id_client).toEqual(id_client);
      expect(stores.data[0]).toHaveProperty('id');
    });

    it('should return an empty array if no stores are found with specific client', async () => {
      const stores = await controller.findAll({
        id_client: id_client,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(0);
    });

    it('should return an array of specific sellers', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await controller.findAll({
        id_seller: id_seller,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(1);
      expect(stores.data[0].name).toEqual('Store');
      expect(stores.data[0].internalCode).toEqual('Store');
      expect(stores.data[0].id_seller).toEqual(id_seller);
      expect(stores.data[0].id_city).toEqual(id_city);
      expect(stores.data[0].id_client).toEqual(id_client);
      expect(stores.data[0]).toHaveProperty('id');
    });

    it('should return an empty array if no stores are found with specific seller', async () => {
      const stores = await controller.findAll({
        id_seller: id_seller,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(0);
    });

    it('should return an array of specific cities', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const stores = await controller.findAll({
        id_city: id_city,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(1);
      expect(stores.data[0].name).toEqual('Store');
      expect(stores.data[0].internalCode).toEqual('Store');
      expect(stores.data[0].id_seller).toEqual(id_seller);
      expect(stores.data[0].id_city).toEqual(id_city);
      expect(stores.data[0].id_client).toEqual(id_client);
      expect(stores.data[0]).toHaveProperty('id');
    });

    it('should return an empty array if no stores are found with specific city', async () => {
      const stores = await controller.findAll({
        id_city: id_city,
      });

      expect(Array.isArray(stores.data)).toBe(true);
      expect(stores.data.length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return a store', async () => {
      const store = await controller.create({
        name: 'Store',
        internalCode: 'Store',
        id_seller: id_seller,
        id_city: id_city,
        id_client: id_client,
      });

      const foundStore = await controller.findOne(store.data.id);

      expect(foundStore.data.name).toEqual('Store');
      expect(foundStore.data.internalCode).toEqual('Store');
      expect(foundStore.data.id_seller).toEqual(id_seller);
      expect(foundStore.data.id_city).toEqual(id_city);
      expect(foundStore.data.id_client).toEqual(id_client);
      expect(foundStore.data).toHaveProperty('id');
    });

    it('should throw an error if store is not found', async () => {
      await expect(controller.findOne(1)).rejects.toThrowError();
    });
  });
});
