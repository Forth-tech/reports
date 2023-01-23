import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { AdGroupService } from '../ad-group/ad-group.service';
import { AdCampaignService } from '../ad-campaign/ad-campaign.service';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { FacebookService } from '../common/services/facebook.service';

@Module({
  controllers: [AdController],
  providers: [
    AdService,
    PrismaService,
    AuditService,
    AdGroupService,
    AdCampaignService,
    FacebookService,
  ],
})
export class AdModule {}
