import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';
<<<<<<< HEAD:src/bi/product/product.controller.ts
import { AuditEventEnum } from '../../common/enums/auditEventEnum';
import { FastifyRequestWithUser } from '../../common/interfaces/customFastifyRequest';
import { AuditService } from '../../common/services/audit.service';
import { JwtAccessTokenAuthGuard } from '../../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
=======
import { AuditEventEnum } from '../common/enums/auditEventEnum';
import { FastifyRequestWithUser } from '../common/interfaces/customFastifyRequest';
import { AuditService } from '../common/services/audit.service';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/product/product.controller.ts
import { GetProductResponseDto } from './dto/getProductResponse.dto';
import { GetProductsQueryDto } from './dto/getProductsQuery.dto';
import { GetProductsResponseDto } from './dto/getProductsResponse.dto';
import { PostProductRequestDto } from './dto/postProductRequest.dto';
import { PostProductResponseDto } from './dto/postProductResponse.dto';
import { ProductOut } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
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
    @Request() req: FastifyRequestWithUser,
    @Body() createProductDto: PostProductRequestDto,
  ): Promise<PostProductResponseDto> {
    const product: Product = await this.productService.create(createProductDto);

    const productOut: ProductOut =
      this.productService.mapProductToProductOut(product);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.ProductCreated,
      product.id,
      JSON.stringify(productOut),
    );

    return {
      success: true,
      message: 'Product created',
      data: productOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
