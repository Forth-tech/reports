import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';

@Injectable()
export class AdService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    // const ad: Ad = await this.prismaService.ad.create({
    //   data: createAdDto,
    // });

    // return ad;
    return 'This action adds a new ad';
  }

  findAll() {
    return `This action returns all ad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ad`;
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }

  remove(id: number) {
    return `This action removes a #${id} ad`;
  }
}
