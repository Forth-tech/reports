import { Injectable } from '@nestjs/common';
import { Ad } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdDto: CreateAdDto): Promise<Ad | null> {
    const ad: Ad | null = await this.findFromNetworkId(createAdDto.networkId);
    if (ad) {
      return null;
    }
    return await this.prismaService.ad.create({
      data: createAdDto,
    });
  }

  async findFromNetworkId(networkId: string): Promise<Ad | null> {
    return this.prismaService.ad.findUnique({
      where: { networkId },
    });
  }

  findAll() {
    return `This action returns all ad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ad`;
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }

  async updateFromNetworkId(networkId: string, updateAdDto: UpdateAdDto) {
    const ad: Ad = await this.prismaService.ad.update({
      where: { networkId },
      data: updateAdDto,
    });

    return ad;
  }

  remove(id: number) {
    return `This action removes a #${id} ad`;
  }
}
