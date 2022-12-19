import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NetworkService } from './network.service';
import { PostNetworkRequestDto } from './dto/postNetworkRequest.dto';
import { JwtAccessTokenAuthGuard } from 'src/auth/jwt-access-token.guard';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostNetworkResponseDto } from './dto/postNetworkResponse.dto';
import { Networks } from '@prisma/client';
import { GetNetworksResponseDto } from './dto/getNetworksResponse.dto';
import { GetNetworkByIdResponseDto } from './dto/getNetworkByIdResponse.dto';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post('/')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('network')
  @ApiOperation({ summary: 'Network Created' })
  @ApiCreatedResponse({
    description: 'Network created',
    type: PostNetworkRequestDto,
  })
  async create(
    @Body() createNetworkDto: PostNetworkRequestDto,
  ): Promise<PostNetworkResponseDto> {
    const network: Networks | null = await this.networkService.create(
      createNetworkDto,
    );

    if (network === null) {
      throw new HttpException('Network not created', HttpStatus.NOT_ACCEPTABLE);
    }

    return {
      success: true,
      message: 'Network created',
      data: network,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('network')
  @ApiOperation({ summary: 'Get all networks' })
  @ApiFoundResponse({
    description: 'Networks found',
    type: GetNetworksResponseDto,
  })
  async findAll(): Promise<GetNetworksResponseDto> {
    const networks: Networks[] = await this.networkService.findAll();

    return {
      success: true,
      message: 'Networks found',
      data: networks,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('network')
  @ApiOperation({ summary: 'Get network by id' })
  @ApiFoundResponse({
    description: 'Network found',
    type: GetNetworkByIdResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<GetNetworkByIdResponseDto> {
    const network: Networks | null = await this.networkService.findOne(+id);

    if (network === null) {
      throw new HttpException('Network not found', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      message: 'Network found',
      data: network,
    };
  }
}
