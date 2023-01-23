import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateAdGroupDto } from '../../ad-group/dto/createAdGroup.dto';
import { AdGroupFacebookOut } from '../../ad-group/entities/ad-group-facebook.entity';
import { CreateAdDto } from '../../ad/dto/create-ad.dto';
import { AdFacebookOut } from '../../ad/entities/ad-facebook.entity';
import { CreatePublicationDto } from '../../publications/dto/create-publication.dto';
import {
  PostMetricsOut,
  PublicationFacebook,
} from '../../publications/entities/publication-facebook.entity';
import { CreateAdCampaign } from '../../ad-campaign/dto/creatAdCampaign.dto';
import { AdCampaignFacebookOut } from '../../ad-campaign/entities/ad-campaign-facebook.entity';
import { Format } from '@prisma/client';

@Injectable()
export class FacebookService {
  private readonly baseUrl = 'https://graph.facebook.com/v15.0';

  async getAllObjects<T>(
    level: string,
    fields: string[],
    filters?: object[],
  ): Promise<T> {
    try {
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
      console.log(request.status);
      console.log(request.data);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllIgObjects<T>(url: string, fields: string[]): Promise<T> {
    try {
      const request = await axios({
        url: `${this.baseUrl}/${url}`,
        method: 'GET',
        params: {
          access_token: process.env.FB_ACCESS_TOKEN,
          fields: fields.join(','),
        },
      });
      console.log(request.status);
      console.log(request.data);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getIgMediaMetrics(
    publicationId: string,
    metrics: string[],
  ): Promise<PostMetricsOut> {
    try {
      const request = await axios({
        url: `${this.baseUrl}/${publicationId}/insights`,
        method: 'GET',
        params: {
          access_token: process.env.FB_ACCESS_TOKEN,
          fields: metrics.join(','),
        },
      });
      console.log(request.status);
      console.log(request.data);
      return request.data;
    } catch (error) {
      console.log(error);
    }
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
      investedValue: Number(adFacebook.spend.replace('.', '')),
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

  mapToPublication(
    publicationFacebook: PublicationFacebook,
    publicationMetrics: PostMetricsOut,
    id_network: number,
  ): CreatePublicationDto {
    let publicationFormat;

    switch (publicationFacebook.media_type) {
      case 'CAROUSEL_ALBUM':
        publicationFormat = Format.CARROUSSEL;
        break;
      case 'VIDEO':
        publicationFormat = Format.VIDEO;
        break;
      case 'IMAGE':
        publicationFormat = Format.STATIC;
        break;
    }
    const publication: Partial<CreatePublicationDto> = {
      id_network: id_network,
      url: publicationFacebook.media_url,
      date: new Date(publicationFacebook.timestamp),
      networkId: publicationFacebook.id,
      format: publicationFormat,
      likes: publicationFacebook.likes_count,
      comments: publicationFacebook.comments_count,
    };

    publicationMetrics.data.forEach((metric) => {
      switch (metric.name) {
        case 'impressions':
          publication.impressions = Number(metric.values[0].value);
          break;
        case 'reach':
          publication.reach = Number(metric.values[0].value);
          break;
        case 'saved':
          publication.saves = Number(metric.values[0].value);
          break;
        case 'profile_visits':
          publication.profileAccess = Number(metric.values[0].value);
          break;
        case 'shares':
          publication.shares = Number(metric.values[0].value);
        case 'follows':
          publication.gainedFollowers = Number(metric.values[0].value);
          break;
        case 'video_views':
          publication.videoViews = Number(metric.values[0].value);
          break;
      }
    });

    return publication as CreatePublicationDto;
  }
}
