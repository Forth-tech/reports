import { Injectable } from '@nestjs/common';
import { Client, Roles, User } from '@prisma/client';
import { RfmClassification } from '../../common/entities/rfmClassification.entity';
import { PrismaService } from '../../common/services/prisma.service';
import { PostClientRequestDto } from './dto/postClientRequest.dto';
import { ClientOut } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClientDto: PostClientRequestDto): Promise<Client> {
    return this.prismaService.client.create({
      data: {
        name: createClientDto.name,
        internalCode: createClientDto.internalCode,
      },
    });
  }

  async findAll(user: User): Promise<Client[]> {
    let permissionFilter = undefined;
    if (user.Role === Roles.SELLER) {
      permissionFilter = {
        id: user.id_external,
      };
    } else if (user.Role === Roles.SUPERVISOR) {
      permissionFilter = {
        Supervisor: {
          id: user.id_external,
        },
      };
    }
    return this.prismaService.client.findMany({
      where: {
        Store: {
          some: {
            Seller: permissionFilter,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getRfmClassification(): Promise<RfmClassification[]> {
    return this.prismaService.$queryRaw<RfmClassification[]>`
    SELECT
      rfm.id_client as idClient,
      CASE WHEN rfm.rfm_recency = 4
        AND rfm.rfm_frequency = 4
        AND rfm.rfm_monetary = 4 THEN
        "Best Customer"
      WHEN rfm.rfm_recency >= 3
        AND rfm.rfm_frequency >= 3
        AND rfm.rfm_monetary >= 3 THEN
        "Loyal"
      WHEN rfm.rfm_recency >= 3
        AND rfm.rfm_frequency >= 1
        AND rfm.rfm_monetary >= 2 THEN
        "Potetial Loyalist"
      WHEN rfm.rfm_recency >= 3
        AND rfm.rfm_frequency >= 1
        AND rfm.rfm_monetary >= 1 THEN
        "Promising"
      WHEN rfm.rfm_recency >= 2
        AND rfm.rfm_frequency >= 2
        AND rfm.rfm_monetary >= 2 THEN
        "Customers Needing Attention"
      WHEN rfm.rfm_recency >= 1
        AND rfm.rfm_frequency >= 2
        AND rfm.rfm_monetary >= 2 THEN
        "At Risk"
      WHEN rfm.rfm_recency >= 1
        AND rfm.rfm_frequency >= 1
        AND rfm.rfm_monetary >= 2 THEN
        "Hibernating"
      ELSE
        "Lost"
      END AS RFMType,
      rfm.rfm_recency * 100 + rfm.rfm_frequency * 10 + rfm.rfm_monetary AS RFMScale
    FROM (
      SELECT
        t.id_client id_client,
        NTILE(4) OVER (ORDER BY t.LastPurchase DESC) AS rfm_recency,
        NTILE(4) OVER (ORDER BY t.Purchases DESC) AS rfm_frequency,
        NTILE(4) OVER (ORDER BY t.pvalue DESC) AS rfm_monetary
      FROM (
      SELECT
        c.id id_client,
        max(p.date) AS LastPurchase,
        count(DISTINCT p.id) AS Purchases,
        sum( CASE WHEN p.type = "VENDA" THEN
          pi.price * pi.quantity
        ELSE
          - pi.price * pi.quantity
        END) AS pvalue
      FROM
        TB_Client c
        INNER JOIN TB_Store s ON s.id_client = c.id
        INNER JOIN TB_Purchase p ON s.id = p.id_store
        INNER JOIN TB_PurchaseItem pi ON pi.id_purchase = p.id
      WHERE DATEDIFF(NOW(), p.date) < 365
      GROUP BY
        c.id) t) rfm`;
  }

  mapClientToClientOut(client: Client): ClientOut {
    return {
      id: client.id,
      name: client.name,
      internalCode: client.internalCode,
    };
  }
}
