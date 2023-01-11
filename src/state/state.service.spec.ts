import { Test, TestingModule } from '@nestjs/testing';
import { State } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { StateService } from './state.service';

const testState1 = 'Test State 1';
const testState1Id = 1;

const stateArray: State[] = [
  {
    name: testState1,
    id: testState1Id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { name: 'Test State 2', id: 2, createdAt: new Date(), updatedAt: new Date() },
];

const oneState: State = stateArray[0];

const db = {
  state: {
    findMany: jest.fn().mockResolvedValue(stateArray),
    findUnique: jest.fn().mockResolvedValue(oneState),
    create: jest.fn().mockResolvedValue(oneState),
  },
};

describe('StateService', () => {
  let service: StateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<StateService>(StateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of states', async () => {
      const states = await service.findAll();

      expect(states).toBeDefined();
      expect(states.length).toEqual(2);
    });
  });

  describe('getOne', () => {
    it('should get a simple state', async () => {
      const state = await service.findOne(testState1Id);

      expect(state).toBeDefined();
      expect(state.name).toEqual(testState1);
      expect(state.id).toEqual(testState1Id);
    });
  });

  describe('create', () => {
    it('should create a state', async () => {
      const state = await service.create({ name: testState1 });

      expect(state).toBeDefined();
      expect(state.name).toEqual(testState1);
      expect(state.id).toEqual(testState1Id);
    });
  });

  describe('mapToStateOut', () => {
    it('should map a state to state out', () => {
      const storeOut = service.mapStateToStateOut(oneState);

      expect(storeOut).toBeDefined();
      expect(storeOut.name).toEqual(oneState.name);
    });
  });
});
