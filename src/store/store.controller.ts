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
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Store } from '@prisma/client';
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

@Controller('')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
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
    @Body() createStoreDto: PostStoreRequestDto,
  ): Promise<PostStoreResponseDto> {
    const store: Store = await this.storeService.create(createStoreDto);

    const storeOut: StoreOut = this.storeService.mapStoreToStoreOut(store);

    return {
      success: true,
      message: 'Store Created',
      data: storeOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
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
  @ApiCookieAuth()
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
  async findOne(@Param('id') id: number): Promise<GetStoreResponseDto> {
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
  @ApiCookieAuth()
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
    @Param('id') id: number,
    @Body() updateStoreDto: PatchStoreRequestDto,
  ): Promise<PatchStoreResponseDto> {
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

    return {
      success: true,
      message: 'Store Updated',
      data: storeOut,
    };
  }
}
