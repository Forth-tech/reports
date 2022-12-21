import { Module } from '@nestjs/common';
import { AdCampaignService } from './ad-campaign.service';
import { AdCampaignController } from './ad-campaign.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [AdCampaignController],
  providers: [AdCampaignService, PrismaService],
})
export class AdCampaignModule {}
