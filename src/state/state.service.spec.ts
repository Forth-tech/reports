import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService, PrismaService],
    }).compile();

    service = module.get<StateService>(StateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    const deleteAllState = prisma.state.deleteMany;

    await deleteAllState();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a state', async () => {
      const state = await service.create({
        name: 'Test State',
      });

      expect(state).toBeDefined();
      expect(state.name).toEqual('Test State');
    });
  });

  describe('findAll', () => {
    it('should be empty', async () => {
      const states = await service.findAll();

      expect(states).toBeDefined();
      expect(states.length).toEqual(0);
    });

    it('should find all states', async () => {
      const state = await service.create({
        name: 'Test State',
      });

      expect(state).toBeDefined();
      expect(state.name).toEqual('Test State');

      const states = await service.findAll();

      expect(states).toBeDefined();
      expect(states.length).toEqual(1);
    });
  });

  describe('findOne', () => {
    it('should find state by id', async () => {
      const state = await service.create({
        name: 'Test State',
      });

      expect(state).toBeDefined();
      expect(state.name).toEqual('Test State');

      const stateById = await service.findOne(state.id);

      expect(stateById).toBeDefined();
      expect(stateById.name).toEqual('Test State');
      expect(stateById.id).toEqual(state.id);
    });
  });
});
