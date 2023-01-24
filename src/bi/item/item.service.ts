import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import { GetItemsQueryDto } from './dto/getItemQuery.dto';
import { PostItemRequestDto } from './dto/postItemRequest.dto';
import { ItemOut } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemDto: PostItemRequestDto): Promise<Item> {
    return this.prismaService.item.create({
      data: {
        id_purchase: createItemDto.id_purchase,
        id_product: createItemDto.id_product,
        price: createItemDto.price,
        quantity: createItemDto.quantity,
      },
    });
  }

  async findAll(query?: GetItemsQueryDto, page?: number): Promise<Item[]> {
    if (!query) {
      return this.prismaService.item.findMany({
        skip: page ? (page - 1) * 50 : 0,
        take: 50,
      });
    }
    return this.prismaService.item.findMany({
      where: {
        id_purchase: query.id_purchase ? query.id_purchase : undefined,
        id_product: query.id_product ? query.id_product : undefined,
      },
      skip: page ? (page - 1) * 50 : 0,
      take: 50,
    });
  }

  async findOne(id: number): Promise<Item | null> {
    return this.prismaService.item.findUnique({
      where: {
        id: id,
      },
    });
  }

  mapItemToItemOut(item: Item): ItemOut {
    return {
      id: item.id,
      id_purchase: item.id_purchase,
      id_product: item.id_product,
      price: item.price,
      quantity: item.quantity,
    };
  }
}
