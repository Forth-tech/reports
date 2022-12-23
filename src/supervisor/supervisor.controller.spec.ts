import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';

describe('SupervisorController', () => {
  let controller: SupervisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupervisorController],
      providers: [SupervisorService],
    }).compile();

    controller = module.get<SupervisorController>(SupervisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
