import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { GetProductsQueryDto } from './dto/getProductsQuery.dto';
import { PostProductRequestDto } from './dto/postProductRequest.dto';
import { ProductOut } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: PostProductRequestDto): Promise<Product> {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(query?: GetProductsQueryDto): Promise<Product[]> {
    if (!query) {
      return this.prismaService.product.findMany();
    }
    return this.prismaService.product.findMany({
      where: {
        id_family: query?.id_family,
      },
    });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  mapProductToProductOut(product: Product): ProductOut {
    return {
      id: product.id,
      id_family: product.id_family,
      name: product.name,
      internalCode: product.internalCode,
    };
  }
}
