import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateAdGroupDto } from 'src/ad-group/dto/createAdGroup.dto';
import { AdGroupFacebookOut } from 'src/ad-group/entities/ad-group-facebook.entity';
import { CreateAdDto } from 'src/ad/dto/create-ad.dto';
import { AdFacebookOut } from 'src/ad/entities/ad-facebook.entity';
import { CreateAdCampaign } from '../../ad-campaign/dto/creatAdCampaign.dto';
import { AdCampaignFacebookOut } from '../../ad-campaign/entities/ad-campaign-facebook.entity';

@Injectable()
export class FacebookService {
  private readonly baseUrl = 'https://graph.facebook.com/v15.0';

  async getAllObjects<T>(
    level: string,
    fields: string[],
    filters?: object[],
  ): Promise<T> {
    const request = await axios({
      url: `${this.baseUrl}/${process.env.FB_ADD_ACCOUNT_ID}/insights`,
      method: 'GET',
      params: {
        access_token: process.env.FB_ACCESS_TOKEN,
        level: level,
        fields: fields.join(','),
        filtering: filters,
      },
    });

    return request.data;
  }

  mapToAdCampaign(adCampaignFacebook: AdCampaignFacebookOut): CreateAdCampaign {
    const adCampaign: CreateAdCampaign = {
      networkId: adCampaignFacebook.campaign_id,
      networkName: adCampaignFacebook.campaign_name,
      networkGoal: adCampaignFacebook.objective,
      startDate: new Date(adCampaignFacebook.date_start),
      endDate: new Date(adCampaignFacebook.date_stop),
    };

    return adCampaign;
  }

  mapToAdGroup(
    adGroupFacebook: AdGroupFacebookOut,
    id_campaign: number,
  ): CreateAdGroupDto {
    const adGroup: CreateAdGroupDto = {
      networkId: adGroupFacebook.adset_id,
      networkName: adGroupFacebook.adset_name,
      networkGoal: adGroupFacebook.objective,
      startDate: new Date(adGroupFacebook.date_start),
      endDate: new Date(adGroupFacebook.date_stop),
      goal: adGroupFacebook.objective,
      id_campaign: id_campaign,
    };

    return adGroup;
  }

  mapToAd(adFacebook: AdFacebookOut, id_ad_group: number): CreateAdDto {
    const ad: CreateAdDto = {
      networkId: adFacebook.ad_id,
      networkName: adFacebook.ad_name,
      id_adGroup: id_ad_group,
      clicks: Number(adFacebook.clicks),
      reach: Number(adFacebook.reach),
      impressions: Number(adFacebook.impressions),
      spend: Number(adFacebook.spend.replace('.', '')),
      startDate: new Date(adFacebook.date_start),
      endDate: new Date(adFacebook.date_stop),
    };

    adFacebook.actions.forEach((action) => {
      switch (action.action_type) {
        case 'post_reaction':
          ad.likes = Number(action.value);
          break;
        case 'post':
          ad.shares = Number(action.value);
          break;
        case 'onsite_conversion.post_save':
          ad.saves = Number(action.value);
          break;
      }
    });

    return ad;
  }
}
