import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Store } from '@prisma/client';
import { AuditEventEnum } from '../common/enums/auditEventEnum';
import { FastifyRequestWithUser } from '../common/interfaces/customFastifyRequest';
import { AuditService } from '../common/services/audit.service';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetStoreResponseDto } from './dto/getStoreResponse.dto';
import { GetStoresQueryDto } from './dto/getStoresQuery.dto';
import { GetStoresResponseDto } from './dto/getStoresResponse.dto';
import { PatchStoreRequestDto } from './dto/patchStoreRequest.dto';
import { PatchStoreResponseDto } from './dto/patchStoreResponse.dto';
import { PostStoreRequestDto } from './dto/postStoreRequest.dto';
import { PostStoreResponseDto } from './dto/postStoreResponse.dto';
import { StoreOut } from './entities/store.entity';
import { StoreService } from './store.service';
import { grantPermission } from '../utils/grantPermission.guard';

@Controller('')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('store')
  @ApiOperation({ summary: 'Store Created' })
  @ApiCreatedResponse({
    description: 'Store created',
    type: PostStoreResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not created',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostStoreRequestDto })
  async create(
    @Request() req: FastifyRequestWithUser,
    @Body() createStoreDto: PostStoreRequestDto,
  ): Promise<PostStoreResponseDto> {
    const store: Store = await this.storeService.create(createStoreDto);

    const storeOut: StoreOut = this.storeService.mapStoreToStoreOut(store);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.StoreCreated,
      store.id,
      JSON.stringify(storeOut),
    );

    return {
      success: true,
      message: 'Store Created',
      data: storeOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('store')
  @ApiOperation({ summary: 'Stores found' })
  @ApiCreatedResponse({
    description: 'Stores found',
    type: GetStoresResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Store not found',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetStoresQueryDto })
  async findAll(
    @Query() query?: GetStoresQueryDto,
  ): Promise<GetStoresResponseDto> {
    const stores: Store[] = await this.storeService.findAll(query);

    const storesOut: StoreOut[] = stores.map((store: Store) =>
      this.storeService.mapStoreToStoreOut(store),
    );

    return {
      success: true,
      message: 'Store Found',
      data: storesOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('store')
  @ApiOperation({ summary: 'Store found' })
  @ApiCreatedResponse({
    description: 'Store found',
    type: GetStoreResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Store not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: Number })
  async findOne(
    @Request() req: FastifyRequestWithUser,
    @Param('id') id: number,
  ): Promise<GetStoreResponseDto> {
    if (!(await grantPermission('store', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const store: Store | null = await this.storeService.findOne(id);

    if (!store) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    const storeOut: StoreOut = this.storeService.mapStoreToStoreOut(store);

    return {
      success: true,
      message: 'Store Found',
      data: storeOut,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('store')
  @ApiOperation({ summary: 'Store updated' })
  @ApiCreatedResponse({
    description: 'Store updated',
    type: PatchStoreResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Store not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: PatchStoreRequestDto })
  async update(
    @Request() req: FastifyRequestWithUser,
    @Param('id') id: number,
    @Body() updateStoreDto: PatchStoreRequestDto,
  ): Promise<PatchStoreResponseDto> {
    if (!(await grantPermission('store', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const store: Store | null = await this.storeService.findOne(id);

    if (!store) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    const storeUpdated: Store = await this.storeService.update(
      id,
      updateStoreDto,
    );

    const storeOut: StoreOut =
      this.storeService.mapStoreToStoreOut(storeUpdated);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.StoreUpdated,
      store.id,
      JSON.stringify({ old: store, updated: storeOut }),
    );

    return {
      success: true,
      message: 'Store Updated',
      data: storeOut,
    };
  }
}
