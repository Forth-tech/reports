import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';

describe('FamilyController', () => {
  let controller: FamilyController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [FamilyService, PrismaService],
    }).compile();

    controller = module.get<FamilyController>(FamilyController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // After each test clean family table
  afterEach(async () => {
    await prisma.family.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a family', async () => {
      const family = await controller.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      expect(family.data.name).toEqual('Family 1');
      expect(family.data.internalCode).toEqual('FAM1');
    });

    it('should throw an error if the family already exists', async () => {
      await controller.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      await expect(
        controller.create({
          name: 'Family 1',
          internalCode: 'FAM1',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an empty array if no family exists', async () => {
      const families = await controller.findAll();
      expect(families.data).toEqual([]);
    });

    it('should return an array of families', async () => {
      await controller.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      await controller.create({
        name: 'Family 2',
        internalCode: 'FAM2',
      });
      const families = await controller.findAll();
      expect(families.data).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a family', async () => {
      const family = await controller.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      const foundFamily = await controller.findOne(family.data.id);
      expect(foundFamily.data.name).toEqual('Family 1');
      expect(foundFamily.data.internalCode).toEqual('FAM1');
    });

    it('should throw an error if the family does not exist', async () => {
      await expect(controller.findOne(1)).rejects.toThrow();
    });
  });
});
