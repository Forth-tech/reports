import { PartialType } from '@nestjs/mapped-types';
import { CreateAdCampaignDto } from './create-ad-campaign.dto';

export class UpdateAdCampaignDto extends PartialType(CreateAdCampaignDto) {}
