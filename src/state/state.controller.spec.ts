import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { StateController } from './state.controller';
import { StateService } from './state.service';

describe('StateController', () => {
  let controller: StateController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [StateService, PrismaService],
    }).compile();

    controller = module.get<StateController>(StateController);

    prisma = module.get<PrismaService>(PrismaService);
  });

  // After each test, we clean the state table
  afterEach(async () => {
    await prisma.state.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a state', async () => {
      const state = await controller.create({
        name: 'Jakarta',
      });

      expect(state).toBeDefined();
      expect(state).toHaveProperty('success', true);
      expect(state).toHaveProperty('message', 'State created');
      expect(state).toHaveProperty('data');
      expect(state.data).toHaveProperty('id');
      expect(state.data).toHaveProperty('name', 'Jakarta');
    });
  });

  describe('findAll', () => {
    it('should return an empty array', async () => {
      const states = await controller.findAll();

      expect(states).toBeDefined();
      expect(states).toHaveProperty('success', true);
      expect(states).toHaveProperty('message', 'States found');
      expect(states).toHaveProperty('data');
      expect(states.data).toHaveLength(0);
    });

    it('should return an array of states', async () => {
      // Create a state
      await controller.create({
        name: 'Jakarta',
      });

      const states = await controller.findAll();

      expect(states).toBeDefined();
      expect(states).toHaveProperty('success', true);
      expect(states).toHaveProperty('message', 'States found');
      expect(states).toHaveProperty('data');
      expect(states.data).toHaveLength(1);
      expect(states.data[0]).toHaveProperty('id');
      expect(states.data[0]).toHaveProperty('name', 'Jakarta');
    });
  });

  describe('findOne', () => {
    it('should return a state', async () => {
      // Create a state
      const state = await controller.create({
        name: 'Jakarta',
      });

      const stateFound = await controller.findOne(state.data.id);

      expect(stateFound).toBeDefined();
      expect(stateFound).toHaveProperty('success', true);
      expect(stateFound).toHaveProperty('message', 'State found');
      expect(stateFound).toHaveProperty('data');
      expect(stateFound.data).toHaveProperty('id');
      expect(stateFound.data).toHaveProperty('name', 'Jakarta');
    });
  });
});
