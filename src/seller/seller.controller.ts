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
import { Seller } from '@prisma/client';
import { AuditEventEnum } from '../common/enums/auditEventEnum';
import { FastifyRequestWithUser } from '../common/interfaces/customFastifyRequest';
import { AuditService } from '../common/services/audit.service';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetSellerResponseDto } from './dto/getSellerResponse.dto';
import { GetSellersQueryDto } from './dto/getSellersQuery.dto';
import { GetSellersResponseDto } from './dto/getSellersResponse.dto';
import { PostSellerRequestDto } from './dto/postSellerRequest.dto';
import { PostSellerResponseDto } from './dto/postSellerResponse.dto';
import { SellerOut } from './entities/Seller.entity';
import { SellerService } from './seller.service';
import {
  SalesDailyResult,
  SalesMonthlyResult,
  SalesTotalResult,
  SalesWeeklyResult,
} from '../common/entities/salesResults.entity';
import { GetSalesResultResponseDto } from '../common/dto/getSalesResultResponse.dto';
import { GetSellersResultsQueryDto } from './dto/getSellersResultsQuery.dto';
import { ClientAbcCurve } from '../common/entities/clientAbcCurve.entity';
import { GetAbcCurveResponseDto } from '../common/dto/getAbcCurveResponse.dto';
import { GetSellersAbcCurveQueryDto } from './dto/getSellersAbcCurveQuery.dto';
import { grantPermission } from '../utils/grantPermission.guard';

@Controller('')
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
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
    @Request() req: FastifyRequestWithUser,
    @Body() createSellerDto: PostSellerRequestDto,
  ): Promise<PostSellerResponseDto> {
    const seller: Seller = await this.sellerService.create(createSellerDto);

    const sellerOut: SellerOut =
      this.sellerService.mapSellerToSellerOut(seller);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.SellerCreated,
      seller.id,
      JSON.stringify(sellerOut),
    );

    return {
      success: true,
      message: 'Seller Created',
      data: sellerOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  async findOne(
    @Request() req: FastifyRequestWithUser,
    @Param('id') id: number,
  ): Promise<GetSellerResponseDto> {
    if (!(await grantPermission('seller', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const seller: Seller | null = await this.sellerService.findOne(id);

    if (!seller) {
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const SellerOut: SellerOut =
      this.sellerService.mapSellerToSellerOut(seller);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.ViewSeller,
      seller.id,
      JSON.stringify(SellerOut),
    );

    return {
      success: true,
      message: 'Seller found',
      data: SellerOut,
    };
  }

  @Get(':id/results')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('seller')
  @ApiOperation({ summary: 'Find a Seller Monthly Result' })
  @ApiFoundResponse({
    description: 'Seller found',
    type: GetSalesResultResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Seller not found',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetSellersResultsQueryDto, required: false })
  @ApiParam({ name: 'id', description: 'Seller id', type: Number })
  async montlhyResult(
    @Request() req: FastifyRequestWithUser,
    @Query() query: GetSellersResultsQueryDto,
    @Param('id') id: number,
  ): Promise<GetSalesResultResponseDto> {
    if (!(await grantPermission('seller', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const seller: Seller | null = await this.sellerService.findOne(id);

    if (!seller) {
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    let result:
      | SalesMonthlyResult[]
      | SalesWeeklyResult[]
      | SalesDailyResult[]
      | SalesTotalResult;

    switch (query.format) {
      case 'monthly': {
        result = await this.sellerService.getMonthlyResults(id, query);
        break;
      }
      case 'weekly': {
        result = await this.sellerService.getWeeklyResults(id, query);
        break;
      }
      case 'daily': {
        result = await this.sellerService.getDailyResults(id, query);
        break;
      }
      case 'total': {
        result = await this.sellerService.getTotalResults(id, query);
        break;
      }
      default: {
        throw new HttpException('Invalid format', HttpStatus.BAD_REQUEST);
      }
    }

    return {
      success: true,
      message: 'Seller found',
      data: result,
    };
  }

  @Get(':id/abc-curve')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('seller')
  @ApiOperation({ summary: 'Find a Seller by id' })
  @ApiFoundResponse({
    description: 'Seller found',
    type: GetAbcCurveResponseDto,
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
  async findAbcCurve(
    @Request() req: FastifyRequestWithUser,
    @Param('id') id: number,
    @Query() query: GetSellersAbcCurveQueryDto,
  ): Promise<GetAbcCurveResponseDto> {
    if (!(await grantPermission('seller', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const seller: Seller | null = await this.sellerService.findOne(id);

    if (!seller) {
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const abcCurve: ClientAbcCurve = await this.sellerService.getSellerAbcCurve(
      id,
      query,
    );

    return {
      success: true,
      message: 'Seller found',
      data: abcCurve,
    };
  }
}
