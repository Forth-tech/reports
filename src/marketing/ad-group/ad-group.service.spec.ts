import { Test, TestingModule } from '@nestjs/testing';
import { AdGroupService } from './ad-group.service';

describe('AdGroupService', () => {
  let service: AdGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdGroupService],
    }).compile();

    service = module.get<AdGroupService>(AdGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
