import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdCampaign } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { AdCampaignService } from './ad-campaign.service';
import { PostAdCampaignRequestDto } from './dto/postAdCampaignRequest.dto';
import { PostAdCampaignResponseDto } from './dto/postAdCampaignResponse.dto';
import { UpdateAdCampaignDto } from './dto/update-ad-campaign.dto';
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
  findAll() {
    return this.adCampaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adCampaignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdCampaignDto: UpdateAdCampaignDto,
  ) {
    return this.adCampaignService.update(+id, updateAdCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adCampaignService.remove(+id);
  }
}
