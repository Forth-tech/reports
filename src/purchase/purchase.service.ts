import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { GetPurchasesQueryDto } from './dto/getPurchasesQuery.dto';
import { PostPurchaseRequestDto } from './dto/postPurchaseRequest.dto';
import { PurchaseOut } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPurchaseDto: PostPurchaseRequestDto): Promise<Purchase> {
    return this.prismaService.purchase.create({
      data: {
        internalCode: createPurchaseDto.internalCode,
        id_seller: createPurchaseDto.id_seller,
        id_store: createPurchaseDto.id_store,
        nf: createPurchaseDto.nf,
      },
    });
  }

  async findAll(
    query: GetPurchasesQueryDto,
    page?: number,
  ): Promise<Purchase[]> {
    if (!query) {
      return this.prismaService.purchase.findMany({
        skip: page ? (page - 1) * 10 : 0,
        take: 10,
      });
    }
    return this.prismaService.purchase.findMany({
      where: {
        id_seller: query.id_seller ? query.id_seller : undefined,
        id_store: query.id_store ? query.id_store : undefined,
      },
      skip: page ? (page - 1) * 10 : 0,
      take: 10,
    });
  }

  async findOne(id: number): Promise<Purchase | null> {
    return this.prismaService.purchase.findUnique({
      where: {
        id: id,
      },
    });
  }

  mapPurchaseToPurchaseOut(purchase: Purchase): PurchaseOut {
    return {
      internalCode: purchase.internalCode,
      id_seller: purchase.id_seller,
      id_store: purchase.id_store,
      nf: purchase.nf,
      id: purchase.id,
    };
  }
}
