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
import { Seller } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetSellerResponseDto } from './dto/getSellerResponse.dto';
import { GetSellersQueryDto } from './dto/getSellersQuery.dto';
import { GetSellersResponseDto } from './dto/getSellersResponse.dto';
import { PostSellerRequestDto } from './dto/postSellerRequest.dto';
import { PostSellerResponseDto } from './dto/postSellerResponse.dto';
import { SellerOut } from './entities/Seller.entity';
import { SellerService } from './seller.service';

@Controller('')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('seller')
  @ApiOperation({ summary: 'Create a new Seller' })
  @ApiCreatedResponse({
    description: 'Seller created',
    type: PostSellerResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostSellerRequestDto })
  async create(
    @Body() createSellerDto: PostSellerRequestDto,
  ): Promise<PostSellerResponseDto> {
    const seller: Seller = await this.sellerService.create(createSellerDto);

    const sellerOut: SellerOut =
      this.sellerService.mapSellerToSellerOut(seller);

    return {
      success: true,
      message: 'Seller Created',
      data: sellerOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('seller')
  @ApiOperation({ summary: 'Find all Sellers' })
  @ApiFoundResponse({
    description: 'Sellers found',
    type: GetSellersResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetSellersQueryDto, required: false })
  async findAll(
    @Query() query?: GetSellersQueryDto,
  ): Promise<GetSellersResponseDto> {
    const sellers: Seller[] = await this.sellerService.findAll(query);

    const sellersOut: SellerOut[] = sellers.map((seller: Seller) =>
      this.sellerService.mapSellerToSellerOut(seller),
    );

    return {
      success: true,
      message: 'Sellers Found',
      data: sellersOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('seller')
  @ApiOperation({ summary: 'Find a Seller by id' })
  @ApiFoundResponse({
    description: 'Seller found',
    type: GetSellerResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Seller not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', description: 'Seller id', type: Number })
  async findOne(@Param('id') id: number): Promise<GetSellerResponseDto> {
    const seller: Seller | null = await this.sellerService.findOne(id);

    if (!seller) {
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const SellerOut: SellerOut =
      this.sellerService.mapSellerToSellerOut(seller);

    return {
      success: true,
      message: 'Seller found',
      data: SellerOut,
    };
  }
}
