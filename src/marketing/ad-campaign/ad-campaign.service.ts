import { Injectable } from '@nestjs/common';
import { AdCampaign } from '@prisma/client';
<<<<<<< HEAD:src/marketing/ad-campaign/ad-campaign.service.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 2fd0afe7145d8fe17dbc013ab8759ee729eaca15:src/ad-campaign/ad-campaign.service.ts
import { CreateAdCampaign } from './dto/creatAdCampaign.dto';
import { GetAdCampaignQueryDto } from './dto/getAdCampaignQuery.dto';
import { PatchAdCampaignRequestDto } from './dto/patchAdCampaignRequest.dto';
import { AdCampaignOut } from './entities/ad-campaign.entity';

@Injectable()
export class AdCampaignService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAdCampaignDto: CreateAdCampaign,
  ): Promise<AdCampaign | null> {
    const campaign: AdCampaign | null = await this.findFromNetworkId(
      createAdCampaignDto.networkId,
    );
    if (campaign) {
      return null;
    }
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

  async updateFromNetworkId(
    networkId: string,
    updateAdCampaignDto: PatchAdCampaignRequestDto,
  ): Promise<AdCampaign> {
    return this.prismaService.adCampaign.update({
      where: { networkId: networkId },
      data: updateAdCampaignDto,
    });
  }

  async findFromNetworkId(networkId: string): Promise<AdCampaign | null> {
    return this.prismaService.adCampaign.findUnique({
      where: { networkId: networkId },
    });
  }

  mapAdCampaignToAdCampaignOut(adCampaign: AdCampaign): AdCampaignOut {
    delete adCampaign.createdAt;
    delete adCampaign.updatedAt;
    return adCampaign;
  }
}
