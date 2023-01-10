import { Injectable } from '@nestjs/common';
import { Prisma, Roles, Seller, User } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { GetSellersAbcCurveQueryDto } from './dto/getSellersAbcCurveQuery.dto';
import { GetSellersQueryDto } from './dto/getSellersQuery.dto';
import { GetSellersResultsQueryDto } from './dto/getSellersResultsQuery.dto';
import { PostSellerRequestDto } from './dto/postSellerRequest.dto';
import { SellerOut } from './entities/seller.entity';
import { ClientAbcCurve } from '../common/entities/clientAbcCurve.entity';
import {
  SalesDailyResult,
  SalesMonthlyResult,
  SalesTotalResult,
  SalesWeeklyResult,
} from '../common/entities/salesResults.entity';

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

  async findAll(user: User, query?: GetSellersQueryDto): Promise<Seller[]> {
    let permissionFilter = undefined;
    if (user.Role === Roles.SUPERVISOR) {
      permissionFilter = {
        id: user.id_external,
      };
    }
    return this.prismaService.seller.findMany({
      where: {
        id_supervisor: query?.id_supervisor,
        Supervisor: permissionFilter,
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
  async getMonthlyResults(
    id: number,
    query?: GetSellersResultsQueryDto,
  ): Promise<SalesMonthlyResult[]> {
    return this.prismaService.$queryRaw<SalesMonthlyResult[]>`
    SELECT
        EXTRACT(MONTH FROM p.date) AS month,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
      WHERE 
        id_seller = ${id}
        ${
          query.start_date
            ? Prisma.sql`AND p.date >= ${query.start_date}`
            : Prisma.empty
        }
        ${
          query.end_date
            ? Prisma.sql`AND p.date <= ${query.end_date}`
            : Prisma.empty
        }
      GROUP BY
        month`;
  }

  // Get seller weekly results
  async getWeeklyResults(
    id: number,
    query?: GetSellersResultsQueryDto,
  ): Promise<SalesWeeklyResult[]> {
    return this.prismaService.$queryRaw<SalesWeeklyResult[]>`
    SELECT
        EXTRACT(WEEK FROM p.date) AS week,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${
          query.products
            ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id`
            : Prisma.empty
        }
      WHERE
        id_seller = ${id}
        ${
          query.start_date
            ? Prisma.sql`AND p.date >= ${query.start_date}`
            : Prisma.empty
        }
        ${
          query.end_date
            ? Prisma.sql`AND p.date <= ${query.end_date}`
            : Prisma.empty
        }
        ${
          query.products
            ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})`
            : Prisma.empty
        }
      GROUP BY
        week`;
  }

  // Get seller daily results
  async getDailyResults(
    id: number,
    query?: GetSellersResultsQueryDto,
  ): Promise<SalesDailyResult[]> {
    return this.prismaService.$queryRaw<SalesDailyResult[]>`
    SELECT
        EXTRACT(DAY FROM p.date) AS day,
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${
          query.products
            ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id`
            : Prisma.empty
        }
      WHERE
        id_seller = ${id}
        ${
          query.start_date
            ? Prisma.sql`AND p.date >= ${query.start_date}`
            : Prisma.empty
        }
        ${
          query.end_date
            ? Prisma.sql`AND p.date <= ${query.end_date}`
            : Prisma.empty
        }
        ${
          query.products
            ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})`
            : Prisma.empty
        }
      GROUP BY
        day`;
  }

  // Get seller total results
  async getTotalResults(
    id: number,
    query?: GetSellersResultsQueryDto,
  ): Promise<SalesTotalResult> {
    return this.prismaService.$queryRaw<SalesTotalResult>`
    SELECT
        SUM(i.price*i.quantity) AS total
      FROM
        TB_Purchase p
        left join TB_PurchaseItem i on p.id = i.id_purchase
        ${
          query.products
            ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id`
            : Prisma.empty
        }
      WHERE
        id_seller = ${id}
        ${
          query.start_date
            ? Prisma.sql`AND p.date >= ${query.start_date}`
            : Prisma.empty
        }
        ${
          query.end_date
            ? Prisma.sql`AND p.date <= ${query.end_date}`
            : Prisma.empty
        }
        ${
          query.products
            ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})`
            : Prisma.empty
        }`;
  }

  async getSellerAbcCurve(
    id: number,
    query: GetSellersAbcCurveQueryDto,
  ): Promise<ClientAbcCurve> {
    return this.prismaService.$queryRaw<ClientAbcCurve>`
    SELECT
      sa.id_client as idClient,
      sa.totalsales as total,
      sum(sa.totalsales) OVER (ORDER BY sa.totalsales DESC) AS cumulativeSales,
      sum(sa.totalsales) OVER () AS totalSales,
      sum(sa.totalsales) OVER (ORDER BY sa.totalsales DESC) / SUM(sa.totalsales) OVER () AS cumulativePercentage,
      CASE WHEN SUM(sa.totalsales) OVER (ORDER BY sa.totalsales DESC) / SUM(sa.totalsales) OVER () < 0.7 THEN
        'A'
      WHEN SUM(sa.totalsales) OVER (ORDER BY sa.totalsales DESC) / SUM(sa.totalsales) OVER () < 0.9 THEN
        'B'
      ELSE
        'C'
      END AS class
    FROM (
      SELECT
        c.id id_client,
        SUM(
          CASE WHEN p.type = "VENDA" THEN
            pi.price * pi.quantity
          ELSE
            - pi.price * pi.quantity
          END) TotalSales
      FROM
        TB_Purchase p
        INNER JOIN TB_Store s ON p.id_store = s.id
        INNER JOIN TB_Client c ON s.id_client = c.id
        INNER JOIN TB_PurchaseItem pi ON p.id = pi.id_purchase
        ${
          query.products
            ? Prisma.sql`left join TB_Product pr on i.id_product = pr.id`
            : Prisma.empty
        }
      WHERE
        p.id_seller = ${id}
        ${
          query.start_date
            ? Prisma.sql`AND p.date >= ${query.start_date}`
            : Prisma.empty
        }
        ${
          query.end_date
            ? Prisma.sql`AND p.date <= ${query.end_date}`
            : Prisma.empty
        }
        ${
          query.products
            ? Prisma.sql`AND pr.id IN (${Prisma.join(query.products)})`
            : Prisma.empty
        }
      GROUP BY
        c.id) sa
    GROUP BY
      sa.id_client,
      sa.totalsales;`;
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
