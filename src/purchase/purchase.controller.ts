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
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PostPurchaseRequestDto } from './dto/postPurchaseRequest.dto';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
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
import { PostPurchaseResponseDto } from './dto/postPurchaseResponse.dto';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { Purchase } from '@prisma/client';
import { PurchaseOut } from './entities/purchase.entity';
import { GetPurchasesQueryDto } from './dto/getPurchasesQuery.dto';
import { GetPurchasesResponseDto } from './dto/getPurchasesResponse.dto';
import { GetPurchaseResponseDto } from './dto/getPurchaseResponse.dto';

@Controller('')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('purchase')
  @ApiOperation({ summary: 'Create a new purchase' })
  @ApiCreatedResponse({
    description: 'Purchase created',
    type: PostPurchaseResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostPurchaseRequestDto })
  async create(
    @Body() createPurchaseDto: PostPurchaseRequestDto,
  ): Promise<PostPurchaseResponseDto> {
    const purchase: Purchase = await this.purchaseService.create(
      createPurchaseDto,
    );

    const purchaseOut: PurchaseOut =
      this.purchaseService.mapPurchaseToPurchaseOut(purchase);

    return {
      success: true,
      message: 'Purchase Created',
      data: purchaseOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('purchase')
  @ApiOperation({ summary: 'Get all purchases' })
  @ApiFoundResponse({
    description: 'Purchases found',
    type: [PurchaseOut],
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetPurchasesQueryDto })
  async findAll(
    @Query() query?: GetPurchasesQueryDto,
  ): Promise<GetPurchasesResponseDto> {
    const purchases: Purchase[] = await this.purchaseService.findAll(query);

    const purchasesOut: PurchaseOut[] = purchases.map((purchase: Purchase) => {
      return this.purchaseService.mapPurchaseToPurchaseOut(purchase);
    });

    return {
      success: true,
      message: 'Purchases Found',
      data: purchasesOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('purchase')
  @ApiOperation({ summary: 'Get a purchase' })
  @ApiFoundResponse({
    description: 'Purchase found',
    type: PurchaseOut,
  })
  @ApiNotFoundResponse({
    description: 'Purchase not found',
    type: DefaultResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number): Promise<GetPurchaseResponseDto> {
    const purchase: Purchase | null = await this.purchaseService.findOne(id);

    if (!purchase) {
      throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND);
    }

    const purchaseOut: PurchaseOut =
      this.purchaseService.mapPurchaseToPurchaseOut(purchase);

    return {
      success: true,
      message: 'Purchase Found',
      data: purchaseOut,
    };
  }
}
