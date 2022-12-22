import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let prisma: PrismaService;
  let id_state, id_city, id_seller, id_client, id_store: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService, PrismaService],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
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
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase', async () => {
      const purchase = await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      expect(purchase).toBeDefined();
      expect(purchase.internalCode).toBe('Purchase');
      expect(purchase.id_seller).toBe(id_seller);
      expect(purchase.id_store).toBe(id_store);
      expect(purchase.nf).toBe('1');
    });

    it('should throw an error if the purchase already exists', async () => {
      await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      await expect(
        service.create({
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
      await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      await service.create({
        internalCode: 'Purchase2',
        id_seller: id_seller,
        id_store: id_store,
        nf: '2',
      });
      const purchases = await service.findAll({});
      expect(purchases).toBeDefined();
      expect(purchases.length).toBe(2);
    });

    it('should return an array of purchases with the query', async () => {
      await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      await service.create({
        internalCode: 'Purchase2',
        id_seller: id_seller,
        id_store: id_store,
        nf: '2',
      });
      const purchases = await service.findAll({ id_seller: id_seller });
      expect(purchases).toBeDefined();
      expect(purchases.length).toBe(2);
    });

    it('should return an array of purchases with the page', async () => {
      await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      await service.create({
        internalCode: 'Purchase2',
        id_seller: id_seller,
        id_store: id_store,
        nf: '2',
      });
      const purchases = await service.findAll({}, 1);
      expect(purchases).toBeDefined();
      expect(purchases.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase', async () => {
      const purchase = await service.create({
        internalCode: 'Purchase',
        id_seller: id_seller,
        id_store: id_store,
        nf: '1',
      });
      const purchaseFound = await service.findOne(purchase.id);

      expect(purchaseFound).toBeDefined();
      expect(purchaseFound.internalCode).toBe('Purchase');
      expect(purchaseFound.id_seller).toBe(id_seller);
      expect(purchaseFound.id_store).toBe(id_store);
      expect(purchaseFound.nf).toBe('1');
    });

    it('should throw an error if the purchase does not exist', async () => {
      await expect(service.findOne(1)).toBe(null);
    });
  });
});
