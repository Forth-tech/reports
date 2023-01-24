import { Injectable } from '@nestjs/common';
import { Networks } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import { PostNetworkRequestDto } from './dto/postNetworkRequest.dto';

@Injectable()
export class NetworkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createNetworkDto: PostNetworkRequestDto,
  ): Promise<Networks | null> {
    return this.prismaService.networks.create({
      data: createNetworkDto,
    });
  }

  async findAll(): Promise<Networks[]> {
    return this.prismaService.networks.findMany();
  }

  async findOne(id: number): Promise<Networks | null> {
    return this.prismaService.networks.findUnique({
      where: {
        id: id,
      },
    });
  }
}
