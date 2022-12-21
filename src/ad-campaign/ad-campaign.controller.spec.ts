import { Test, TestingModule } from '@nestjs/testing';
import { AdCampaignController } from './ad-campaign.controller';
import { AdCampaignService } from './ad-campaign.service';

describe('AdCampaignController', () => {
  let controller: AdCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdCampaignController],
      providers: [AdCampaignService],
    }).compile();

    controller = module.get<AdCampaignController>(AdCampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
