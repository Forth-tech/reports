import { Injectable } from '@nestjs/common';
import { Prisma, Seller } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { GetSellersQueryDto } from './dto/getSellersQuery.dto';
import { GetSellersResultsQueryDto } from './dto/getSellersResultsQuery.dto';
import { PostSellerRequestDto } from './dto/postSellerRequest.dto';
import { SellerOut } from './entities/Seller.entity';
import {
  SellerDailyResult,
  SellerMonthlyResult,
  SellerTotalResult,
  SellerWeeklyResult,
} from './entities/sellerMontlhyResult.entity';

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

  // Get seller monthly results
  async getMonthlyResults(id: number, query?: GetSellersResultsQueryDto): Promise<SellerMonthlyResult[]> {
    return this.prismaService.$queryRaw<SellerMonthlyResult[]>`
    SELECT
        EXTRACT(MONTH FROM p.date) AS month,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
      WHERE 
        id_seller = ${id}
        ${query.start_date ? Prisma.sql`AND p.date >= ${query.start_date}` : Prisma.empty}
        ${query.end_date ? Prisma.sql`AND p.date <= ${query.end_date}` : Prisma.empty}
      GROUP BY
        month`;
  }

  // Get seller weekly results
  async getWeeklyResults(id: number, query?: GetSellersResultsQueryDto): Promise<SellerWeeklyResult[]> {
    return this.prismaService.$queryRaw<SellerWeeklyResult[]>`
    SELECT
        EXTRACT(WEEK FROM p.date) AS week,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${query.products ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id` : Prisma.empty}
      WHERE
        id_seller = ${id}
        ${query.start_date ? Prisma.sql`AND p.date >= ${query.start_date}` : Prisma.empty}
        ${query.end_date ? Prisma.sql`AND p.date <= ${query.end_date}` : Prisma.empty}
        ${query.products ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})` : Prisma.empty}
      GROUP BY
        week`;
  }

  // Get seller daily results
  async getDailyResults(id: number, query?: GetSellersResultsQueryDto): Promise<SellerDailyResult[]> {
    return this.prismaService.$queryRaw<SellerDailyResult[]>`
    SELECT
        EXTRACT(DAY FROM p.date) AS day,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${query.products ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id` : Prisma.empty}
      WHERE
        id_seller = ${id}
        ${query.start_date ? Prisma.sql`AND p.date >= ${query.start_date}` : Prisma.empty}
        ${query.end_date ? Prisma.sql`AND p.date <= ${query.end_date}` : Prisma.empty}
        ${query.products ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})` : Prisma.empty}
      GROUP BY
        day`;
  }

  // Get seller total results
  async getTotalResults(id: number, query?: GetSellersResultsQueryDto): Promise<SellerTotalResult> {
    return this.prismaService.$queryRaw<SellerTotalResult>`
    SELECT
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${query.products ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id` : Prisma.empty}
      WHERE
        id_seller = ${id}
        ${query.start_date ? Prisma.sql`AND p.date >= ${query.start_date}` : Prisma.empty}
        ${query.end_date ? Prisma.sql`AND p.date <= ${query.end_date}` : Prisma.empty}
        ${query.products ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})` : Prisma.empty}`;
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
