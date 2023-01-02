import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let prisma: PrismaService;
  let id_family: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.family.deleteMany();
  });

  afterEach(async () => {
    await prisma.product.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const product = await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      expect(product.data).toHaveProperty('id');
      expect(product.data.name).toBe('Product');
      expect(product.data.internalCode).toBe('Product');
    });

    it('should throw an error if the product already exists', async () => {
      await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      await expect(
        controller.create({
          name: 'Product',
          internalCode: 'Product',
          id_family: id_family,
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if the family does not exist', async () => {
      await expect(
        controller.create({
          name: 'Product',
          internalCode: 'Product',
          id_family: 0,
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await controller.findAll();

      expect(products.data).toBeInstanceOf(Array);
    });

    it('should return an array of products with the correct properties', async () => {
      const product = await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await controller.findAll();

      expect(products.data[0]).toHaveProperty('id');
      expect(products.data[0]).toHaveProperty('name');
      expect(products.data[0]).toHaveProperty('internalCode');
      expect(products.data[0]).toHaveProperty('id_family');
      expect(products.data[0].id).toBe(product.data.id);
      expect(products.data[0].name).toBe(product.data.name);
      expect(products.data[0].internalCode).toBe(product.data.internalCode);
      expect(products.data[0].id_family).toBe(product.data.id_family);
    });

    it('should return an array of products with the correct properties and values', async () => {
      const product = await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await controller.findAll();

      expect(products.data[0]).toHaveProperty('id', product.data.id);
      expect(products.data[0]).toHaveProperty('name', product.data.name);
      expect(products.data[0]).toHaveProperty(
        'internalCode',
        product.data.internalCode,
      );
      expect(products.data[0]).toHaveProperty(
        'id_family',
        product.data.id_family,
      );
    });

    it('should return an array of products with the correct length', async () => {
      await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await controller.findAll();

      expect(products.data).toHaveLength(1);
    });

    it('should return an array when filtered by Family', async () => {
      await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const products = await controller.findAll({
        id_family: id_family,
      });

      expect(products.data).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product = await controller.create({
        name: 'Product',
        internalCode: 'Product',
        id_family: id_family,
      });

      const productFound = await controller.findOne(product.data.id);

      expect(productFound.data).toHaveProperty('id');
      expect(productFound.data).toHaveProperty('name');
      expect(productFound.data).toHaveProperty('internalCode');
      expect(productFound.data).toHaveProperty('id_family');
      expect(productFound.data.id).toBe(product.data.id);
      expect(productFound.data.name).toBe(product.data.name);
      expect(productFound.data.internalCode).toBe(product.data.internalCode);
      expect(productFound.data.id_family).toBe(product.data.id_family);
    });

    it('should throw an error if the product does not exist', async () => {
      await expect(controller.findOne(0)).rejects.toThrow();
    });
  });
});
