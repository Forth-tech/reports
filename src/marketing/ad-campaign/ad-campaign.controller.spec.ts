import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/services/prisma.service';
import { AdCampaignController } from './ad-campaign.controller';
import { AdCampaignService } from './ad-campaign.service';

describe('AdCampaignController', () => {
  let controller: AdCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdCampaignController],
      providers: [AdCampaignService, PrismaService],
    }).compile();

    controller = module.get<AdCampaignController>(AdCampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
