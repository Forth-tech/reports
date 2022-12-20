import { PartialType } from '@nestjs/mapped-types';
import { CreateAdCampaignDto } from './postAdCampaignRequest.dto';

export class UpdateAdCampaignDto extends PartialType(CreateAdCampaignDto) {}
