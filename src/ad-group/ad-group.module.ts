import { Module } from '@nestjs/common';
import { AdGroupService } from './ad-group.service';
import { AdGroupController } from './ad-group.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { AdCampaignService } from '../ad-campaign/ad-campaign.service';
import { FacebookService } from '../common/services/facebook.service';

@Module({
  controllers: [AdGroupController],
  providers: [
    AdGroupService,
    PrismaService,
    AuditService,
    AdCampaignService,
    FacebookService,
  ],
})
export class AdGroupModule {}
