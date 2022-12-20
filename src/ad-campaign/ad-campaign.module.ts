import { Module } from '@nestjs/common';
import { AdCampaignService } from './ad-campaign.service';
import { AdCampaignController } from './ad-campaign.controller';

@Module({
  controllers: [AdCampaignController],
  providers: [AdCampaignService]
})
export class AdCampaignModule {}
