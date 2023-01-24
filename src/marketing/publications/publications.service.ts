import { Injectable } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createPublicationDto: CreatePublicationDto,
  ): Promise<Publication | null> {
    const publication: Publication | null = await this.findByNetworkId(
      createPublicationDto.networkId,
    );
    if (publication) return null;
    return this.prismaService.publication.create({
      data: createPublicationDto,
    });
  }

  findAll() {
    return `This action returns all publications`;
  }

  async findByNetworkId(networkId: string): Promise<Publication | null> {
    return this.prismaService.publication.findUnique({
      where: { networkId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  async updateByNetworkId(
    networkId: string,
    updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication | null> {
    return this.prismaService.publication.update({
      where: { networkId },
      data: updatePublicationDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
