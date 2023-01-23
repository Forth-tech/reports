import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdCampaign } from '@prisma/client';
import { AuditEventEnum } from 'src/common/enums/auditEventEnum';
import { AuditService } from 'src/common/services/audit.service';
import { FacebookService } from '../common/services/facebook.service';
import { AdCampaignService } from './ad-campaign.service';
import { CreateAdCampaign } from './dto/creatAdCampaign.dto';
import { PatchAdCampaignRequestDto } from './dto/patchAdCampaignRequest.dto';
import {
  AdCampaignFacebookOut,
  AdCampaignFacebookRequestOut,
} from './entities/ad-campaign-facebook.entity';

@Controller('')
export class AdCampaignController {
  constructor(
    private readonly adCampaignService: AdCampaignService,
    private readonly facebookService: FacebookService,
    private readonly auditService: AuditService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async updateAdCampaigns() {
    const facebookAdCampaign: AdCampaignFacebookRequestOut =
      await this.facebookService.getAllObjects<AdCampaignFacebookRequestOut>(
        'campaign',
        ['campaign_name', 'campaign_id', 'objective'],
      );

    facebookAdCampaign.data.forEach(
      async (adCampaign: AdCampaignFacebookOut) => {
        const adCampaignOut: CreateAdCampaign =
          this.facebookService.mapToAdCampaign(adCampaign);

        const createdCampaign: AdCampaign | null =
          await this.adCampaignService.create(adCampaignOut);

        if (!createdCampaign) {
          const updatedCampaign: AdCampaign =
            await this.adCampaignService.updateFromNetworkId(
              adCampaign.campaign_id,
              adCampaignOut as PatchAdCampaignRequestDto,
            );

          this.auditService.createAuditLog(
            0,
            AuditEventEnum.UpdateAdCampaign,
            updatedCampaign.id,
            JSON.stringify(updatedCampaign),
          );
        } else {
          this.auditService.createAuditLog(
            0,
            AuditEventEnum.CreateAdCampaign,
            createdCampaign.id,
            JSON.stringify(createdCampaign),
          );
        }
      },
    );
  }
}
