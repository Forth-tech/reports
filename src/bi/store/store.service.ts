import { Injectable } from '@nestjs/common';
import { Roles, Store, User } from '@prisma/client';
<<<<<<< HEAD:src/bi/store/store.service.ts
import { PrismaService } from '../../common/services/prisma.service';
=======
import { PrismaService } from '../common/services/prisma.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/store/store.service.ts
import { GetStoresQueryDto } from './dto/getStoresQuery.dto';
import { PatchStoreRequestDto } from './dto/patchStoreRequest.dto';
import { PostStoreRequestDto } from './dto/postStoreRequest.dto';
import { StoreOut } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStoreDto: PostStoreRequestDto): Promise<Store> {
    return this.prismaService.store.create({
      data: {
        name: createStoreDto.name,
        internalCode: createStoreDto.internalCode,
        id_seller: createStoreDto.id_seller,
        id_city: createStoreDto.id_city,
        id_client: createStoreDto.id_client,
      },
    });
  }

  async findAll(user: User, query?: GetStoresQueryDto): Promise<Store[]> {
    if (!query) {
      return this.prismaService.store.findMany();
    }
    let sellerFilter;
    if (user.Role === Roles.SELLER) {
      sellerFilter = {
        id: user.id,
      };
    } else if (user.Role === Roles.SUPERVISOR) {
      sellerFilter = {
        Supervisor: {
          id: user.id,
        },
      };
    } else {
      sellerFilter = undefined;
    }
    return this.prismaService.store.findMany({
      where: {
        id_client: query.id_client ? query.id_client : undefined,
        id_seller: query.id_seller ? query.id_seller : undefined,
        id_city: query.id_city ? query.id_city : undefined,
        Seller: sellerFilter,
      },
    });
  }

  async findOne(id: number): Promise<Store | null> {
    return this.prismaService.store.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateStoreDto: PatchStoreRequestDto,
  ): Promise<Store> {
    return this.prismaService.store.update({
      where: {
        id: id,
      },
      data: updateStoreDto,
    });
  }

  mapStoreToStoreOut(store: Store): StoreOut {
    return {
      id: store.id,
      name: store.name,
      internalCode: store.internalCode,
      id_seller: store.id_seller,
      id_city: store.id_city,
      id_client: store.id_client,
    };
  }
}
