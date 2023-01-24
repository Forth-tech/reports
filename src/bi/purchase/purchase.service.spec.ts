import { Test, TestingModule } from '@nestjs/testing';
import { Purchase, Roles, User } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import { PurchaseService } from './purchase.service';

const testPurchase1 = 'Test Purchase 1';
const testPurchase1Id = 1;

const purchaseArray: Purchase[] = [
  {
    id: testPurchase1Id,
    id_seller: 1,
    id_store: 1,
    internalCode: testPurchase1,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'VENDA',
    date: new Date(),
    nf: '123',
  },
  {
    id: 2,
    id_seller: 1,
    id_store: 1,
    internalCode: 'Test Purchase 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'VENDA',
    date: new Date(),
    nf: '124',
  },
];

const onePurchase: Purchase = purchaseArray[0];

const db = {
  purchase: {
    findMany: jest.fn().mockResolvedValue(purchaseArray),
    findUnique: jest.fn().mockResolvedValue(onePurchase),
    create: jest.fn().mockResolvedValue(onePurchase),
  },
};

const testUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com',
  Role: Roles.SELLER,
  id_external: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  hashedPassword: 'test',
  hash: 'test',
};

describe('PurchaseService', () => {
  let service: PurchaseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<PurchaseService>(PurchaseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of purchases', async () => {
      const purchases = await service.findAll({}, testUser);

      expect(purchases).toBeDefined();
      expect(purchases.length).toEqual(2);
    });
  });

  describe('getOne', () => {
    it('should return one purchase', async () => {
      const purchase = await service.findOne(testPurchase1Id);

      expect(purchase).toBeDefined();
      expect(purchase.internalCode).toEqual(testPurchase1);
    });
  });

  describe('create', () => {
    it('should create a purchase', async () => {
      const purchase = await service.create({
        id_seller: 1,
        id_store: 1,
        internalCode: testPurchase1,
        nf: '123',
      });

      expect(purchase).toBeDefined();
      expect(purchase.internalCode).toEqual(testPurchase1);
    });
  });
});
