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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Family } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { GetFamiliesResponseDto } from './dto/getFamiliesResponse.dto';
import { GetFamilyResponseDto } from './dto/getFamilyResponse.dto';
import { PostFamilyRequestDto } from './dto/postFamilyRequest.dto';
import { PostFamilyResponseDto } from './dto/postFamilyResponse.dto';
import { FamilyOut } from './entities/family.entity';
import { FamilyService } from './family.service';

@Controller('')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('family')
  @ApiOperation({ summary: 'Create a new Family' })
  @ApiCreatedResponse({
    description: 'Family created',
    type: PostFamilyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostFamilyRequestDto })
  async create(
    @Body() createFamilyDto: PostFamilyRequestDto,
  ): Promise<PostFamilyResponseDto> {
    const family: Family = await this.familyService.create(createFamilyDto);

    const familyOut: FamilyOut =
      this.familyService.mapFamilyToFamilyOut(family);

    return {
      success: true,
      message: 'Family Created',
      data: familyOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('family')
  @ApiOperation({ summary: 'Find all families' })
  @ApiFoundResponse({
    description: 'Families found',
    type: GetFamiliesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async findAll(): Promise<GetFamiliesResponseDto> {
    const families: Family[] = await this.familyService.findAll();

    const familiesOut: FamilyOut[] = families.map((family: Family) =>
      this.familyService.mapFamilyToFamilyOut(family),
    );

    return {
      success: true,
      message: 'Families found',
      data: familiesOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('product')
  @ApiOperation({ summary: 'Find a family by id' })
  @ApiFoundResponse({
    description: 'Family found',
    type: GetFamilyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Family not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', description: 'Family id', type: Number })
  async findOne(@Param('id') id: number): Promise<GetFamilyResponseDto> {
    const family: Family | null = await this.familyService.findOne(id);

    if (!family) {
      throw new HttpException('Family not found', HttpStatus.NOT_FOUND);
    }

    const familyOut: FamilyOut =
      this.familyService.mapFamilyToFamilyOut(family);

    return {
      success: true,
      message: 'Family found',
      data: familyOut,
    };
  }
}
