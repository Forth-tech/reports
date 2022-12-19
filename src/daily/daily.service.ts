import { Injectable } from '@nestjs/common';
import { Daily, Network } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { GetDailyQueryDto } from './dto/getDailyQuery.dto';
import { PatchDailyRequestDto } from './dto/patchDailyRequest.dto';
import { PostDailyRequestDto } from './dto/postDailyRequest.dto';
import { DailyOut } from './entities/dailyOut.entity';

@Injectable()
export class DailyService {
  constructor(private prismaService: PrismaService) {}
  async create(daily: PostDailyRequestDto): Promise<Daily> {
    return this.prismaService.daily.create({ data: daily });
  }

  async findAll() {
    return this.prismaService.daily.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 1000,
    });
  }

  async findDailyQuery(query: GetDailyQueryDto): Promise<Daily[]> {
    const { network, startDate, endDate } = query;

    const where = {
      network: network ? { equals: network } : undefined,
      date: {
        gte: startDate ? startDate : undefined,
        lte: endDate ? endDate : undefined,
      },
    };

    return this.prismaService.daily.findMany({ where });
  }

  async findDailyById(id: number): Promise<Daily | null> {
    return this.prismaService.daily.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: PatchDailyRequestDto): Promise<Daily> {
    return this.prismaService.daily.update({
      where: {
        id,
      },
      data,
    });
  }

  mapDailyToDailyOut(daily: Daily): DailyOut {
    delete daily.updatedAt;
    return daily;
  }
}
