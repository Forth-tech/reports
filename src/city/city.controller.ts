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
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { City } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { CityService } from './city.service';
import { GetCitiesQueryDto } from './dto/getCitiesQuery.dto';
import { GetCitiesResponseDto } from './dto/getCitiesResponse.dto';
import { GetCityResponseDto } from './dto/getCityResponse.dto';
import { PostCityRequestDto } from './dto/postCityRequest.dto';
import { PostCityResponseDto } from './dto/postCityResponse.dto';
import { CityOut } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('city')
  @ApiOperation({ summary: 'Create a new city' })
  @ApiCreatedResponse({
    description: 'City created',
    type: PostCityResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async create(
    @Body() createCityDto: PostCityRequestDto,
  ): Promise<PostCityResponseDto> {
    const city: City = await this.cityService.create(createCityDto);

    const cityOut: CityOut = this.cityService.mapCityToCityOut(city);

    return {
      success: true,
      message: 'City Created',
      data: cityOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('city')
  @ApiOperation({ summary: 'Create a new city' })
  @ApiFoundResponse({
    description: 'City found',
    type: GetCitiesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiQuery({ type: GetCitiesQueryDto })
  async findAll(@Query() getCitiesQueryDto?: GetCitiesQueryDto) {
    const cities: City[] = await this.cityService.findAll(getCitiesQueryDto);

    const citiesOut: CityOut[] = cities.map((city: City) =>
      this.cityService.mapCityToCityOut(city),
    );

    return {
      success: true,
      message: 'Cities found',
      data: citiesOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('city')
  @ApiOperation({ summary: 'Get a city by id' })
  @ApiFoundResponse({
    description: 'City found',
    type: GetCityResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'City not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number) {
    const city: City | null = await this.cityService.findOne(id);

    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    const cityOut: CityOut = this.cityService.mapCityToCityOut(city);

    return {
      success: true,
      message: 'City found',
      data: cityOut,
    };
  }
}
