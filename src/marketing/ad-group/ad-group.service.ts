import { Injectable } from '@nestjs/common';
import { AdCampaign, AdGroup } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateAdGroupDto } from './dto/createAdGroup.dto';
import { UpdateAdGroupDto } from './dto/update-ad-group.dto';

@Injectable()
export class AdGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdGroupDto: CreateAdGroupDto): Promise<AdGroup | null> {
    const adGroup: AdGroup | null = await this.findFromNetworkId(
      createAdGroupDto.networkId,
    );
    if (adGroup) {
      return null;
    }
    return this.prismaService.adGroup.create({
      data: createAdGroupDto,
    });
  }

  async findFromNetworkId(networkId: string): Promise<AdGroup | null> {
    return this.prismaService.adGroup.findUnique({
      where: {
        networkId: networkId,
      },
    });
  }

  findAll() {
    return `This action returns all adGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adGroup`;
  }

  update(id: number, updateAdGroupDto: UpdateAdGroupDto) {
    return `This action updates a #${id} adGroup`;
  }

  async updateFromNetworkId(
    networkId: string,
    updateAdGroupDto: UpdateAdGroupDto,
  ): Promise<AdGroup | null> {
    return this.prismaService.adGroup.update({
      where: {
        networkId: networkId,
      },
      data: updateAdGroupDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} adGroup`;
  }
}
