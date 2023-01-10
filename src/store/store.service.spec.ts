import { Test, TestingModule } from '@nestjs/testing';
import { Roles, Store, User } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { StoreService } from './store.service';

const testStore1 = 'Test Store 1';
const testStore1Id = 1;

const storeArray: Store[] = [
  {
    name: testStore1,
    id: testStore1Id,
    createdAt: new Date(),
    updatedAt: new Date(),
    id_seller: 1,
    id_client: 1,
    internalCode: '1',
    id_city: 1,
  },
  {
    name: 'Test Store 2',
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    id_seller: 1,
    id_client: 1,
    internalCode: '1',
    id_city: 1,
  },
];

const user: User = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com',
  Role: Roles.SELLER,
  id_external: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  hash: 'test',
  hashedPassword: 'test',
};

const oneStore: Store = storeArray[0];

const db = {
  store: {
    findMany: jest.fn().mockResolvedValue(storeArray),
    findUnique: jest.fn().mockResolvedValue(oneStore),
    create: jest.fn().mockResolvedValue(oneStore),
  },
};

describe('StoreService', () => {
  let service: StoreService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<StoreService>(StoreService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all stores', async () => {
      const stores = await service.findAll(user);

      expect(stores).toBeDefined();
      expect(stores.length).toEqual(2);
    });
  });

  describe('getOne', () => {
    it('should return one store', async () => {
      const store = await service.findOne(testStore1Id);

      expect(store).toBeDefined();
      expect(store.name).toEqual(testStore1);
    });
  });

  describe('create', () => {
    it('should create a store', async () => {
      const store = await service.create({
        name: testStore1,
        id_seller: 1,
        id_client: 1,
        internalCode: '1',
        id_city: 1,
      });

      expect(store).toBeDefined();
      expect(store.name).toEqual(testStore1);
    });
  });
});
