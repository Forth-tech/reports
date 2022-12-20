import { Injectable } from '@nestjs/common';
import { CreateAdCampaignDto } from './dto/create-ad-campaign.dto';
import { UpdateAdCampaignDto } from './dto/update-ad-campaign.dto';

@Injectable()
export class AdCampaignService {
  create(createAdCampaignDto: CreateAdCampaignDto) {
    return 'This action adds a new adCampaign';
  }

  findAll() {
    return `This action returns all adCampaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adCampaign`;
  }

  update(id: number, updateAdCampaignDto: UpdateAdCampaignDto) {
    return `This action updates a #${id} adCampaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} adCampaign`;
  }
}
