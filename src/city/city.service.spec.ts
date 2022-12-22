import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;
  let stateId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, PrismaService],
    }).compile();

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);

    const state = await prisma.state.create({
      data: {
        name: 'Jakarta',
      },
    });
    stateId = state.id;
  });

  // Clean city database after each test
  afterEach(async () => {
    await prisma.city.deleteMany();
    await prisma.state.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a city', async () => {
      const city = await service.create({
        name: 'Jakarta',
        id_state: stateId,
      });

      expect(city).toBeDefined();
      expect(city.name).toEqual('Jakarta');
      expect(city.id_state).toEqual(stateId);
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
        id_state: stateId,
      });

      await service.create({
        name: 'Bandung',
        id_state: stateId,
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
        id_state: stateId,
      });

      const cityFound = await service.findOne(city.id);

      expect(cityFound).toBeDefined();
      expect(cityFound).toBeInstanceOf(Object);
      expect(cityFound.name).toEqual('Jakarta');
      expect(cityFound.id_state).toEqual(stateId);
    });

    it('should return null', async () => {
      const cityFound = await service.findOne(1);

      expect(cityFound).toBeNull();
    });
  });
});
