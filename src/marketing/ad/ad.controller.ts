import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FacebookService } from '../../common/services/facebook.service';
import { JwtAccessTokenAuthGuard } from '../../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {
  AdFacebookOut,
  AdFacebookRequestOut,
} from './entities/ad-facebook.entity';
import { AuditService } from '../../common/services/audit.service';
import { AdGroupService } from '../ad-group/ad-group.service';
import { Ad, AdCampaign, AdGroup } from '@prisma/client';
import { AdGroupFacebook } from 'src/marketing/ad-group/entities/ad-group-facebook.entity';
import { CreateAdCampaign } from 'src/marketing/ad-campaign/dto/creatAdCampaign.dto';
import { AdCampaignFacebookRequestOut } from 'src/marketing/ad-campaign/entities/ad-campaign-facebook.entity';
import { AuditEventEnum } from 'src/common/enums/auditEventEnum';
import { CreateAdGroupDto } from 'src/marketing/ad-group/dto/createAdGroup.dto';
import { AdCampaignService } from 'src/marketing/ad-campaign/ad-campaign.service';

@Controller('')
export class AdController {
  constructor(
    private readonly adService: AdService,
    private readonly facebookService: FacebookService,
    private readonly adGroupService: AdGroupService,
    private readonly adCampaignService: AdCampaignService,
    private readonly auditService: AuditService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async updateAds() {
    const sinceFilter = Math.floor(
      (Date.now() - 1000 * 60 * 60 * 24 * 30) / 1000,
    );

    const allAds =
      await this.facebookService.getAllObjects<AdFacebookRequestOut>(
        'ad',
        [
          'ad_id',
          'adset_id',
          'clicks',
          'impressions',
          'reach',
          'spend',
          'actions',
        ],
        sinceFilter,
      );

    allAds.data.forEach(async (ad: AdFacebookOut) => {
      await this.createAd(ad);
    });

    while (allAds.paging.next) {
      const nextAds =
        await this.facebookService.getAllObjects<AdFacebookRequestOut>(
          'ad',
          [
            'ad_id',
            'adset_id',
            'clicks',
            'impressions',
            'reach',
            'spend',
            'actions',
          ],
          sinceFilter,
          allAds.paging.cursors.after,
        );

      nextAds.data.forEach(async (ad: AdFacebookOut) => {
        await this.createAd(ad);
      });
    }
  }

  async createAd(ad: AdFacebookOut): Promise<void> {
    let adGroup: AdGroup | null = await this.adGroupService.findFromNetworkId(
      ad.adset_id,
    );

    if (!adGroup) {
      adGroup = await this.createAdGroupFromNetworkId(ad.adset_id);
    }

    const adDto: CreateAdDto = this.facebookService.mapToAd(ad, adGroup.id);

    const createdAd: Ad | null = await this.adService.create(adDto);

    if (!createdAd) {
      const updatedAd: Ad = await this.adService.updateFromNetworkId(
        adDto.networkId,
        adDto,
      );

      this.auditService.createAuditLog(
        1,
        AuditEventEnum.UpdateAd,
        updatedAd.id,
        '',
      );
    } else {
      this.auditService.createAuditLog(
        1,
        AuditEventEnum.CreateAd,
        createdAd.id,
        '',
      );
    }
  }

  async createAdGroupFromNetworkId(networkId: string): Promise<AdGroup> {
    const facebookAdGroup: AdGroupFacebook =
      await this.facebookService.getAllObjects<AdGroupFacebook>(
        'adset',
        ['adset_id', 'adset_name', 'campaign_id', 'objective'],
        null,
        null,
        [{ field: 'adset_id', value: networkId }],
      );

    let adCampaign: AdCampaign | null =
      await this.adCampaignService.findFromNetworkId(
        facebookAdGroup.data[0].campaign_id,
      );

    if (!adCampaign) {
      adCampaign = await this.createAdCampaignFromNetworkId(
        facebookAdGroup.data[0].campaign_id,
      );
    }

    const adGroupDto: CreateAdGroupDto = this.facebookService.mapToAdGroup(
      facebookAdGroup.data[0],
      adCampaign.id,
    );
    const adGroup: AdGroup = await this.adGroupService.create(adGroupDto);

    this.auditService.createAuditLog(
      1,
      AuditEventEnum.CreateAdGroupViaAd,
      adGroup.id,
      '',
    );

    return adGroup;
  }

  async createAdCampaignFromNetworkId(networkId: string): Promise<AdCampaign> {
    const facebookAdCampaign: AdCampaignFacebookRequestOut =
      await this.facebookService.getAllObjects<AdCampaignFacebookRequestOut>(
        'campaign',
        ['campaign_id', 'campaign_name', 'objective'],
        null,
        null,
        [{ field: 'campaign_id', value: networkId }],
      );

    const adCampaignDto: CreateAdCampaign =
      this.facebookService.mapToAdCampaign(facebookAdCampaign[0]);

    const adCampaign: AdCampaign = await this.adCampaignService.create(
      adCampaignDto,
    );

    this.auditService.createAuditLog(
      1,
      AuditEventEnum.CreateAdCampaignViaAd,
      adCampaign.id,
      '',
    );

    return adCampaign;
  }
}
