import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { SellerService } from './seller.service';

describe('SellerService', () => {
  let service: SellerService;
  let prisma: PrismaService;
  let id_supervisor: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerService, PrismaService],
    }).compile();

    service = module.get<SellerService>(SellerService);
    prisma = module.get<PrismaService>(PrismaService);

    // Create a Supervisor before each test
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
      providers: [SellerService, PrismaService],
    }).compile();

    service = module.get<SellerService>(SellerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.seller.deleteMany();
  });

  afterAll(async () => {
    await prisma.seller.deleteMany();
    await prisma.supervisor.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a seller', async () => {
      const seller = await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      expect(seller).toHaveProperty('id');
    });

    it('should throw an error if the seller already exists', async () => {
      await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      await expect(
        service.create({
          name: 'Seller',
          internalCode: 'Seller',
          id_supervisor: id_supervisor,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of sellers', async () => {
      await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const sellers = await service.findAll();

      expect(sellers).toHaveLength(1);
    });

    it('should return an empty array if there are no sellers', async () => {
      const sellers = await service.findAll();

      expect(sellers).toHaveLength(0);
    });

    it('should return an array of sellers with the correct properties', async () => {
      await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const sellers = await service.findAll();

      expect(sellers[0]).toHaveProperty('id');
      expect(sellers[0]).toHaveProperty('name');
      expect(sellers[0]).toHaveProperty('internalCode');
      expect(sellers[0]).toHaveProperty('supervisor');
    });

    it('should return an array filtered by supervisors', async () => {
      await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const sellers = await service.findAll({ id_supervisor: id_supervisor });

      expect(sellers).toHaveLength(1);
    });

    it('should return an empty array if there are no sellers with the given supervisor', async () => {
      const sellers = await service.findAll({ id_supervisor: id_supervisor });

      expect(sellers).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a seller', async () => {
      const seller = await service.create({
        name: 'Seller',
        internalCode: 'Seller',
        id_supervisor: id_supervisor,
      });

      const foundSeller = await service.findOne(seller.id);

      expect(foundSeller).toHaveProperty('id');
      expect(foundSeller).toHaveProperty('name');
      expect(foundSeller).toHaveProperty('internalCode');
      expect(foundSeller).toHaveProperty('supervisor');
    });

    it('should throw an error if the seller does not exist', async () => {
      const sellerFound = await service.findOne(0);

      expect(sellerFound).toBeNull();
    });
  });
});
