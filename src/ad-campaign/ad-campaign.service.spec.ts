import { Test, TestingModule } from '@nestjs/testing';
import { AdCampaignService } from './ad-campaign.service';

describe('AdCampaignService', () => {
  let service: AdCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdCampaignService],
    }).compile();

    service = module.get<AdCampaignService>(AdCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
