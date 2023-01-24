import { Test, TestingModule } from '@nestjs/testing';
import { AdGroupController } from './ad-group.controller';
import { AdGroupService } from './ad-group.service';

describe('AdGroupController', () => {
  let controller: AdGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdGroupController],
      providers: [AdGroupService],
    }).compile();

    controller = module.get<AdGroupController>(AdGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
