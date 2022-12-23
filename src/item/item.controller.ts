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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetItemsQueryDto } from './dto/getItemQuery.dto';
import { GetItemResponseDto } from './dto/getItemResponse.dto';
import { GetItemsResponseDto } from './dto/getItemsResponse.dto';
import { PostItemRequestDto } from './dto/postItemRequest.dto';
import { PostItemResponseDto } from './dto/postItemResponse.dto';
import { ItemOut } from './entities/item.entity';
import { ItemService } from './item.service';

@Controller('')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('item')
  @ApiOperation({ summary: 'Create a new Item' })
  @ApiCreatedResponse({
    description: 'Item created',
    type: PostItemResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostItemRequestDto })
  async create(
    @Body() createItemDto: PostItemRequestDto,
  ): Promise<PostItemResponseDto> {
    const item: Item = await this.itemService.create(createItemDto);

    const itemOut: ItemOut = this.itemService.mapItemToItemOut(item);

    return {
      success: true,
      message: 'Item created',
      data: itemOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('item')
  @ApiOperation({ summary: 'Find Items' })
  @ApiFoundResponse({
    description: 'Items Found',
    type: GetItemsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetItemsQueryDto })
  async findAll(
    @Query() query?: GetItemsQueryDto,
  ): Promise<GetItemsResponseDto> {
    const items: Item[] = await this.itemService.findAll(query);

    const itemsOut: ItemOut[] = items.map((item: Item) => {
      return this.itemService.mapItemToItemOut(item);
    });

    return {
      success: true,
      message: 'Items found',
      data: itemsOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('item')
  @ApiOperation({ summary: 'Find Item' })
  @ApiFoundResponse({
    description: 'Item Found',
    type: GetItemResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number) {
    const item: Item | null = await this.itemService.findOne(id);

    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    const itemOut: ItemOut = this.itemService.mapItemToItemOut(item);

    return {
      success: true,
      message: 'Item found',
      data: itemOut,
    };
  }
}
