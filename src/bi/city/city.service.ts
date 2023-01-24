import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import { GetCitiesQueryDto } from './dto/getCitiesQuery.dto';
import { PostCityRequestDto } from './dto/postCityRequest.dto';
import { CityOut } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCityDto: PostCityRequestDto): Promise<City> {
    return this.prismaService.city.create({
      data: {
        name: createCityDto.name,
        state: {
          connect: {
            id: createCityDto.id_state,
          },
        },
      },
    });
  }

  async findAll(query?: GetCitiesQueryDto): Promise<City[]> {
    const { page, id_state } = query ? query : { page: 1, id_state: undefined };

    return this.prismaService.city.findMany({
      where: {
        id_state: id_state ? id_state : undefined,
      },
      skip: page ? (page - 1) * 50 : 0,
      take: 50,
    });
  }

  async findOne(id: number): Promise<City | null> {
    return this.prismaService.city.findUnique({
      where: {
        id: id,
      },
    });
  }

  mapCityToCityOut(city: City): CityOut {
    return {
      name: city.name,
      id_state: city.id_state,
      id: city.id,
    };
  }
}
