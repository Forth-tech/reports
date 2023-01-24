import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/services/prisma.service';
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
