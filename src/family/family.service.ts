import { Injectable } from '@nestjs/common';
import { Family } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { PostFamilyRequestDto } from './dto/postFamilyRequest.dto';
import { FamilyOut } from './entities/family.entity';

@Injectable()
export class FamilyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFamilyDto: PostFamilyRequestDto): Promise<Family> {
    return this.prismaService.family.create({
      data: createFamilyDto,
    });
  }

  async findAll(): Promise<Family[]> {
    return this.prismaService.family.findMany();
  }

  async findOne(id: number): Promise<Family | null> {
    return this.prismaService.family.findUnique({
      where: {
        id,
      },
    });
  }

  mapFamilyToFamilyOut(family: Family): FamilyOut {
    return {
      id: family.id,
      name: family.name,
      internalCode: family.internalCode,
    };
  }
}
