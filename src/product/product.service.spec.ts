import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;
  let id_family: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);

    id_family = (
      await prisma.family.create({
        data: {
          name: 'Family',
          internalCode: 'Family',
        },
      })
    ).id;

    await module.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.family.deleteMany();
  });

  afterEach(async () => {
    await prisma.product.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const product = await service.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      expect(product).toHaveProperty('id');
      expect(product.name).toBe('Product');
      expect(product.internalCode).toBe('Product');
      expect(product.id_family).toBe(id_family);
    });

    it('should throw an error if the product already exists', async () => {
      await service.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      await expect(
        service.create({
          name: 'Product',
          internalCode: 'Product',
          id_family: id_family,
        }),
      ).rejects.toThrowError();
    });

    it('should throw an error if the family does not exist', async () => {
      await expect(
        service.create({
          name: 'Product',
          internalCode: 'Product',
          id_family: 0,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll();

      expect(products).toBeInstanceOf(Array);
    });

    it('should return an array of products with the correct properties', async () => {
      const product = await service.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await service.findAll();

      expect(products[0]).toHaveProperty('id');
      expect(products[0].name).toBe('Product');
      expect(products[0].internalCode).toBe('Product');
      expect(products[0].id_family).toBe(id_family);
    });

    it('should return an array of products with the correct properties when filtering by Family', async () => {
      const product = await service.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await service.findAll({ id_family: id_family });

      expect(products[0]).toHaveProperty('id');
      expect(products[0].name).toBe('Product');
      expect(products[0].internalCode).toBe('Product');
      expect(products[0].id_family).toBe(id_family);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product = await service.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const productFound = await service.findOne(product.id);

      expect(productFound).toHaveProperty('id');
      expect(productFound.name).toBe('Product');
      expect(productFound.internalCode).toBe('Product');
      expect(productFound.id_family).toBe(id_family);
    });

    it('should throw return null if the product does not exist', async () => {
      const productFound = await service.findOne(0);

      expect(productFound).toBeNull();
    });
  });
});
