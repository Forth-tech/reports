import { Injectable } from '@nestjs/common';
import { AdCampaign } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { GetAdCampaignQueryDto } from './dto/getAdCampaignQuery.dto';
import { PatchAdCampaignRequestDto } from './dto/patchAdCampaignRequest.dto';
import { PostAdCampaignRequestDto } from './dto/postAdCampaignRequest.dto';
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

  async findAll(query: GetAdCampaignQueryDto): Promise<AdCampaign[]> {
    const where = {
      goal: query.goal ? { equals: query.goal } : undefined,
      startDate: query.startDate ? { gte: query.startDate } : undefined,
      endDate: query.endDate ? { lte: query.endDate } : undefined,
    };
    return this.prismaService.adCampaign.findMany({
      where: where,
      take: 50,
    });
  }

  async findOne(id: number): Promise<AdCampaign | null> {
    return this.prismaService.adCampaign.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateAdCampaignDto: PatchAdCampaignRequestDto,
  ): Promise<AdCampaign> {
    return this.prismaService.adCampaign.update({
      where: { id: id },
      data: updateAdCampaignDto,
    });
  }

  mapAdCampaignToAdCampaignOut(adCampaign: AdCampaign): AdCampaignOut {
    delete adCampaign.createdAt;
    delete adCampaign.updatedAt;
    return adCampaign;
  }
}
