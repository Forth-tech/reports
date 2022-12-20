import { Injectable } from '@nestjs/common';
import { AdCampaign } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { PostAdCampaignRequestDto } from './dto/postAdCampaignRequest.dto';
import { UpdateAdCampaignDto } from './dto/update-ad-campaign.dto';
import { AdCampaignOut } from './entities/ad-campaign.entity';

@Injectable()
export class AdCampaignService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAdCampaignDto: PostAdCampaignRequestDto,
  ): Promise<AdCampaign | null> {
    return this.prismaService.adCampaign.create({
      data: createAdCampaignDto,
    });
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

  mapAdCampaignToAdCampaignOut(adCampaign: AdCampaign): AdCampaignOut {
    delete adCampaign.createdAt;
    delete adCampaign.updatedAt;
    return adCampaign;
  }
}
