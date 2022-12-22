import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/services/prisma.service';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, PrismaService],
    }).compile();

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Clean city table after each test
  afterEach(async () => {
    await prisma.city.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a city', async () => {
      const city = await service.create({
        name: 'Jakarta',
        id_state: 1,
      });

      expect(city).toBeDefined();
      expect(city.name).toEqual('Jakarta');
      expect(city.id_state).toEqual(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const cities = await service.findAll();

      expect(cities).toBeDefined();
      expect(cities).toBeInstanceOf(Array);
    });

    it('should return array of cities with two cities', async () => {
      await service.create({
        name: 'Jakarta',
        id_state: 1,
      });

      await service.create({
        name: 'Bandung',
        id_state: 2,
      });

      const cities = await service.findAll();

      expect(cities).toBeDefined();
      expect(cities).toBeInstanceOf(Array);
      expect(cities.length).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('should return a city', async () => {
      const city = await service.create({
        name: 'Jakarta',
        id_state: 1,
      });

      const cityFound = await service.findOne(city.id);

      expect(cityFound).toBeDefined();
      expect(cityFound).toBeInstanceOf(Object);
      expect(cityFound.name).toEqual('Jakarta');
      expect(cityFound.id_state).toEqual(1);
    });

    it('should return null', async () => {
      const cityFound = await service.findOne(1);

      expect(cityFound).toBeNull();
    });
  });
});
