import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/services/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService],
    }).compile();

    controller = module.get<CityController>(CityController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeAll(async () => {
    // Create a base state for testing
    await prisma.state.create({
      data: {
        name: 'Jakarta',
      },
    });
  });

  // Clean city database after each test
  afterEach(async () => {
    await prisma.city.deleteMany();
  });

  // Clean state database after all tests
  afterAll(async () => {
    await prisma.state.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a city', async () => {
      const city = await controller.create({
        name: 'Jakarta',
        id_state: 1,
      });

      expect(city).toEqual({
        success: true,
        message: 'City Created',
        data: {
          name: 'Jakarta',
          id_state: 1,
          id: 1,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      await prisma.city.create({
        data: {
          name: 'Jakarta',
          id_state: 1,
        },
      });

      const cities = await controller.findAll();

      expect(cities).toEqual({
        success: true,
        message: 'Cities Found',
        data: [
          {
            name: 'Jakarta',
            id_state: 1,
            id: 1,
          },
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return a city', async () => {
      await prisma.city.create({
        data: {
          name: 'Jakarta',
          id_state: 1,
        },
      });

      const city = await controller.findOne(1);

      expect(city).toEqual({
        success: true,
        message: 'City Found',
        data: {
          name: 'Jakarta',
          id_state: 1,
          id: 1,
        },
      });
    });
  });
});
