import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdCampaign } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { AdCampaignService } from './ad-campaign.service';
import { GetAdCampaignQueryDto } from './dto/getAdCampaignQuery.dto';
import { GetAdCampaignResponseDto } from './dto/getAdCampaignResponse.dto';
import { GetAdCampaignsResponseDto } from './dto/getAdCampaignsResponse.dto';
import { PatchAdCampaignRequestDto } from './dto/patchAdCampaignRequest.dto';
import { PatchAdCampaignResponseDto } from './dto/patchAdCampaignResponse.dto';
import { PostAdCampaignRequestDto } from './dto/postAdCampaignRequest.dto';
import { PostAdCampaignResponseDto } from './dto/postAdCampaignResponse.dto';
import { AdCampaignOut } from './entities/ad-campaign.entity';

@Controller('')
export class AdCampaignController {
  constructor(private readonly adCampaignService: AdCampaignService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('AdCampaign')
  @ApiOperation({ summary: 'Create a new Ad Campaign' })
  @ApiCreatedResponse({
    description: 'Ad Campaign created',
    type: PostAdCampaignResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async create(
    @Body() postAdCampaignDto: PostAdCampaignRequestDto,
  ): Promise<PostAdCampaignResponseDto> {
    const adCampaign: AdCampaign | null = await this.adCampaignService.create(
      postAdCampaignDto,
    );

    if (!adCampaign) {
      throw new HttpException(
        'Error creating Ad Campaign',
        HttpStatus.BAD_REQUEST,
      );
    }

    const adCampaignOut: AdCampaignOut =
      this.adCampaignService.mapAdCampaignToAdCampaignOut(adCampaign);

    return {
      success: true,
      message: 'Ad Campaign created successfully.',
      data: adCampaignOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('AdCampaign')
  @ApiOperation({ summary: 'Get all Ad Campaigns' })
  @ApiCreatedResponse({
    description: 'Ad Campaigns found',
    type: GetAdCampaignsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async findAll(
    @Query() query?: GetAdCampaignQueryDto,
  ): Promise<GetAdCampaignsResponseDto> {
    const adCampaigns: AdCampaign[] = await this.adCampaignService.findAll(
      query,
    );

    const adCampaignsOut: AdCampaignOut[] = adCampaigns.map((adCampaign) => {
      return this.adCampaignService.mapAdCampaignToAdCampaignOut(adCampaign);
    });

    return {
      success: true,
      message: 'Ad Campaigns found successfully.',
      data: adCampaignsOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('AdCampaign')
  @ApiOperation({ summary: 'Get an Ad Campaign' })
  @ApiCreatedResponse({
    description: 'Ad Campaign found',
    type: GetAdCampaignResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Ad Campaign not found',
    type: DefaultResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<GetAdCampaignResponseDto> {
    const adCampaign: AdCampaign | null = await this.adCampaignService.findOne(
      +id,
    );

    if (!adCampaign) {
      throw new HttpException('Ad Campaign not found', HttpStatus.NOT_FOUND);
    }

    const adCampaignOut: AdCampaignOut =
      this.adCampaignService.mapAdCampaignToAdCampaignOut(adCampaign);

    return {
      success: true,
      message: 'Ad Campaign found successfully.',
      data: adCampaignOut,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('AdCampaign')
  @ApiOperation({ summary: 'Update an Ad Campaign' })
  @ApiCreatedResponse({
    description: 'Ad Campaign updated',
    type: PatchAdCampaignResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Ad Campaign not found',
    type: DefaultResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAdCampaignDto: PatchAdCampaignRequestDto,
  ): Promise<PatchAdCampaignResponseDto> {
    const adCampaign: AdCampaign | null = await this.adCampaignService.findOne(
      +id,
    );

    if (!adCampaign) {
      throw new HttpException('Ad Campaign not found', HttpStatus.NOT_FOUND);
    }

    const updatedAdCampaign: AdCampaign = await this.adCampaignService.update(
      +id,
      updateAdCampaignDto,
    );

    const adCampaignOut: AdCampaignOut =
      this.adCampaignService.mapAdCampaignToAdCampaignOut(updatedAdCampaign);

    return {
      success: true,
      message: 'Ad Campaign updated successfully.',
      data: adCampaignOut,
    };
  }
}
