import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;
  let prisma: PrismaService;
  let stateId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, PrismaService],
    }).compile();

    controller = module.get<CityController>(CityController);
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
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a city', async () => {
      const city = await controller.create({
        name: 'Jakarta',
        id_state: stateId,
      });

      expect(city).toEqual({
        success: true,
        message: 'City Created',
        data: {
          name: 'Jakarta',
          id_state: stateId,
          id: city.data.id,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const city = await prisma.city.create({
        data: {
          name: 'Jakarta',
          id_state: stateId,
        },
      });

      const cities = await controller.findAll();

      expect(cities).toEqual({
        success: true,
        message: 'Cities found',
        data: [
          {
            name: 'Jakarta',
            id_state: stateId,
            id: city.id,
          },
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return a city', async () => {
      const city = await prisma.city.create({
        data: {
          name: 'Jakarta',
          id_state:  stateId,
        },
      });

      const cityFound = await controller.findOne(city.id);

      expect(cityFound).toEqual({
        success: true,
        message: 'City found',
        data: {
          name: 'Jakarta',
          id_state: stateId,
          id: city.id,
        },
      });
    });
  });
});
