import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { FamilyService } from './family.service';

describe('FamilyService', () => {
  let service: FamilyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyService, PrismaService],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // After each test, clean the family table
  afterEach(async () => {
    await prisma.family.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a family', async () => {
      const family = await service.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      expect(family.name).toEqual('Family 1');
      expect(family.internalCode).toEqual('FAM1');
    });

    it('should throw an error if the family already exists', async () => {
      await service.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      await expect(
        service.create({
          name: 'Family 1',
          internalCode: 'FAM1',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an empty array if no family exists', async () => {
      const families = await service.findAll();
      expect(families).toEqual([]);
    });

    it('should return an array of families', async () => {
      await service.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      await service.create({
        name: 'Family 2',
        internalCode: 'FAM2',
      });
      const families = await service.findAll();
      expect(families.length).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('should return a family', async () => {
      const family = await service.create({
        name: 'Family 1',
        internalCode: 'FAM1',
      });
      const foundFamily = await service.findOne(family.id);
      expect(foundFamily).toEqual(family);
    });

    it('should return null if the family does not exist', async () => {
      const foundFamily = await service.findOne(1);
      expect(foundFamily).toBeNull();
    });
  });
});
