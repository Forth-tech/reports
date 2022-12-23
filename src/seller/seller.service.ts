import { Injectable } from '@nestjs/common';
import { Seller } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { GetSellersQueryDto } from './dto/getSellersQuery.dto';
import { PostSellerRequestDto } from './dto/postSellerRequest.dto';
import { SellerOut } from './entities/Seller.entity';

@Injectable()
export class SellerService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSellerDto: PostSellerRequestDto): Promise<Seller> {
    return this.prismaService.seller.create({
      data: {
        name: createSellerDto.name,
        internalCode: createSellerDto.internalCode,
        id_supervisor: createSellerDto.id_supervisor,
      },
    });
  }

  async findAll(query?: GetSellersQueryDto): Promise<Seller[]> {
    return this.prismaService.seller.findMany({
      where: {
        id_supervisor: query?.id_supervisor,
      },
    });
  }

  async findOne(id: number): Promise<Seller | null> {
    return this.prismaService.seller.findUnique({
      where: {
        id,
      },
    });
  }

  mapSellerToSellerOut(seller: Seller): SellerOut {
    return {
      id: seller.id,
      id_supervisor: seller.id_supervisor,
      name: seller.name,
      internalCode: seller.internalCode,
    };
  }
}
