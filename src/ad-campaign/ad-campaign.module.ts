import { Module } from '@nestjs/common';
import { AdCampaignService } from './ad-campaign.service';
import { AdCampaignController } from './ad-campaign.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { FacebookService } from '../common/services/facebook.service';

@Module({
  controllers: [AdCampaignController],
  providers: [AdCampaignService, PrismaService, AuditService, FacebookService],
})
export class AdCampaignModule {}
