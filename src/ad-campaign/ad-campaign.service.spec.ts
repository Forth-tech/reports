import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { AdCampaignService } from './ad-campaign.service';

describe('AdCampaignService', () => {
  let service: AdCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdCampaignService, PrismaService],
    }).compile();

    service = module.get<AdCampaignService>(AdCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
