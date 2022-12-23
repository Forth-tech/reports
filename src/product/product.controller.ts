import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt-access-token.guard';
import { DefaultResponseDto } from 'src/common/dto/defaultResponse.dto';
import { GetProductResponseDto } from './dto/getProductResponse.dto';
import { GetProductsQueryDto } from './dto/getProductsQuery.dto';
import { GetProductsResponseDto } from './dto/getProductsResponse.dto';
import { PostProductRequestDto } from './dto/postProductRequest.dto';
import { PostProductResponseDto } from './dto/postProductResponse.dto';
import { ProductOut } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('product')
  @ApiOperation({ summary: 'Create a new Product' })
  @ApiCreatedResponse({
    description: 'Product created',
    type: PostProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostProductRequestDto })
  async create(
    @Body() createProductDto: PostProductRequestDto,
  ): Promise<PostProductResponseDto> {
    const product: Product = await this.productService.create(createProductDto);

    const productOut: ProductOut =
      this.productService.mapProductToProductOut(product);

    return {
      success: true,
      message: 'Product created',
      data: productOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('product')
  @ApiOperation({ summary: 'Find all products' })
  @ApiFoundResponse({
    description: 'Product found',
    type: GetProductsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetProductsQueryDto })
  async findAll(
    @Query() query?: GetProductsQueryDto,
  ): Promise<GetProductsResponseDto> {
    const products: Product[] = await this.productService.findAll(query);

    const productsOut: ProductOut[] = products.map((product: Product) => {
      return this.productService.mapProductToProductOut(product);
    });

    return {
      success: true,
      message: 'Products found',
      data: productsOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('product')
  @ApiOperation({ summary: 'Find a Product' })
  @ApiCreatedResponse({
    description: 'Product found',
    type: GetProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number) {
    const product: Product | null = await this.productService.findOne(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const productOut: ProductOut =
      this.productService.mapProductToProductOut(product);

    return {
      success: true,
      message: 'Product found',
      data: productOut,
    };
  }
}
