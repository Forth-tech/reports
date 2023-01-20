import { Test, TestingModule } from '@nestjs/testing';
import { Roles, Seller, User } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { SellerService } from './seller.service';

const sellerOne = 'Seller One';
const sellerOneId = 1;

const sellerArray: Seller[] = [
  {
    name: sellerOne,
    id: sellerOneId,
    internalCode: '1',
    id_supervisor: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Seller Two',
    id: 2,
    internalCode: '2',
    id_supervisor: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const oneSeller: Seller = sellerArray[0];

const db = {
  seller: {
    findMany: jest.fn().mockResolvedValue(sellerArray),
    findUnique: jest.fn().mockResolvedValue(oneSeller),
    create: jest.fn().mockResolvedValue(oneSeller),
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
  hash: 'test',
  hashedPassword: 'test',
};

describe('SellerService', () => {
  let service: SellerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<SellerService>(SellerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all sellers', async () => {
      const result = await service.findAll(testUser);
      expect(result).toEqual(sellerArray);
    });
  });

  describe('findOne', () => {
    it('should get one seller', async () => {
      const result = await service.findOne(sellerOneId);
      expect(result).toEqual(oneSeller);
    });
  });

  describe('create', () => {
    it('should create a seller', async () => {
      const result = await service.create({
        name: sellerOne,
        internalCode: '1',
        id_supervisor: 1,
      });
      expect(result).toEqual(oneSeller);
    });
  });

  describe('map seller to seller out', () => {
    it('should map a seller to seller out', () => {
      const sellerOut = service.mapSellerToSellerOut(oneSeller);

      expect(sellerOut).not.toHaveProperty('createdAt');
      expect(sellerOut).not.toHaveProperty('updatedAt');
    });
  });
});
