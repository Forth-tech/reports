import { Injectable } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { PostPublicationRequestDto } from './dto/postPublicationRequest.dto';
import { PatchPublicationRequestDto } from './dto/patchPublicationRequest.dto';
import { PublicationOut } from './entities/publication.entity';
import { GetPublicationsQueryDto } from './dto/getPublicationsQuery.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createPublicationDto: PostPublicationRequestDto,
  ): Promise<Publication | null> {
    return this.prismaService.publication.create({
      data: createPublicationDto,
    });
  }

  async findAll(query: GetPublicationsQueryDto): Promise<Publication[] | null> {
    const { network, startDate, endDate, format } = query;

    const where = {
      network: network ? { equals: network } : undefined,
      date: {
        gte: startDate ? startDate : undefined,
        lte: endDate ? endDate : undefined,
      },
      format: format ? { equals: format } : undefined,
    };

    return this.prismaService.publication.findMany({
      where: where,
      take: 50,
    });
  }

  async findPublicationById(id: number): Promise<Publication | null> {
    return this.prismaService.publication.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    patchPublication: PatchPublicationRequestDto,
  ): Promise<Publication | null> {
    return this.prismaService.publication.update({
      where: {
        id: id,
      },
      data: patchPublication,
    });
  }

  async remove(id: number): Promise<Publication | null> {
    return this.prismaService.publication.delete({
      where: {
        id: id,
      },
    });
  }

  mapPublicationToPublicationOut(publication: Publication): PublicationOut {
    delete publication.updatedAt;
    delete publication.createdAt;
    return publication;
  }
}
