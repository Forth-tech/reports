import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdCampaign, AdGroup } from '@prisma/client';
import { AdCampaignService } from 'src/marketing/ad-campaign/ad-campaign.service';
import { CreateAdCampaign } from 'src/marketing/ad-campaign/dto/creatAdCampaign.dto';
import { AdCampaignFacebookRequestOut } from 'src/marketing/ad-campaign/entities/ad-campaign-facebook.entity';
import { AuditEventEnum } from 'src/common/enums/auditEventEnum';
import { AuditService } from 'src/common/services/audit.service';
import { FacebookService } from 'src/common/services/facebook.service';
import { AdGroupService } from './ad-group.service';
import { CreateAdGroupDto } from './dto/createAdGroup.dto';
import { UpdateAdGroupDto } from './dto/update-ad-group.dto';
import {
  AdGroupFacebook,
  AdGroupFacebookOut,
} from './entities/ad-group-facebook.entity';

@Controller('')
export class AdGroupController {
  constructor(
    private readonly adGroupService: AdGroupService,
    private readonly facebookService: FacebookService,
    private readonly adCampaignService: AdCampaignService,
    private readonly auditService: AuditService,
  ) {}

  // @Post()
  // create(@Body() createAdGroupDto: CreateAdGroupDto) {
  //   return this.adGroupService.create(createAdGroupDto);
  // }

  @Get()
  findAll() {
    return this.adGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdGroupDto: UpdateAdGroupDto) {
    return this.adGroupService.update(+id, updateAdGroupDto);
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async updateAdGroups() {
    const adGroups = await this.facebookService.getAllObjects<AdGroupFacebook>(
      'adset',
      ['adset_id', 'adset_name', 'campaign_id', 'objective'],
    );

    adGroups.data.forEach(async (adGroup: AdGroupFacebookOut) => {
      let adCampaign: AdCampaign | null =
        await this.adCampaignService.findFromNetworkId(adGroup.campaign_id);

      if (!adCampaign) {
        adCampaign = await this.createAdCampaignFromNetworkId(
          adGroup.campaign_id,
        );
      }

      const adGroupDto: CreateAdGroupDto = this.facebookService.mapToAdGroup(
        adGroup,
        adCampaign.id,
      );
      const createdAdGroup: AdGroup | null = await this.adGroupService.create(
        adGroupDto,
      );

      if (!createdAdGroup) {
        const updatedAdGroup: AdGroup =
          await this.adGroupService.updateFromNetworkId(
            adGroupDto.networkId,
            adGroupDto,
          );

        this.auditService.createAuditLog(
          1,
          AuditEventEnum.UpdateAdGroup,
          updatedAdGroup.id,
          '',
        );
      } else {
        this.auditService.createAuditLog(
          1,
          AuditEventEnum.CreateAdGroup,
          createdAdGroup.id,
          '',
        );
      }
    });
  }

  async createAdCampaignFromNetworkId(networkId: string): Promise<AdCampaign> {
    const facebookAdCampaign: AdCampaignFacebookRequestOut =
      await this.facebookService.getAllObjects<AdCampaignFacebookRequestOut>(
        'campaign',
        ['campaign_id', 'campaign_name', 'objective'],
        [{ field: 'campaign_id', value: networkId }],
      );

    const adCampaignDto: CreateAdCampaign =
      this.facebookService.mapToAdCampaign(facebookAdCampaign[0]);

    const adCampaign = await this.adCampaignService.create(adCampaignDto);

    this.auditService.createAuditLog(
      1,
      AuditEventEnum.CreateAdCampaignViaAdGroup,
      adCampaign.id,
      '',
    );

    return adCampaign;
  }
}
