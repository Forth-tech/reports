import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Daily } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../../src/auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../../src/common/dto/defaultResponse.dto';
import { DailyService } from './daily.service';
import { GetDailyQueryDto } from './dto/getDailyQuery.dto';
import { GetDailyResponseDto } from './dto/getDailyResponse.dto';
import { PatchDailyRequestDto } from './dto/patchDailyRequest.dto';
import { PostDailyRequestDto } from './dto/postDailyRequest.dto';
import { PostDailyResponseDto } from './dto/postDailyResponse.dto';
import { DailyOut } from './entities/dailyOut.entity';

@Controller('daily')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @Post('/')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('daily')
  @ApiOperation({ summary: 'Create a new daily result' })
  @ApiCreatedResponse({
    description: 'Daily result created',
    type: PostDailyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async create(
    @Body() body: PostDailyRequestDto,
  ): Promise<PostDailyResponseDto> {
    const createDailyDto: Daily = await this.dailyService.create(body);

    const dailyOut: DailyOut =
      this.dailyService.mapDailyToDailyOut(createDailyDto);

    return {
      success: true,
      message: 'Daily result created',
      data: dailyOut,
    };
  }

  @Get('/')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('daily')
  @ApiOperation({ summary: 'Get all daily results' })
  @ApiFoundResponse({
    description: 'Daily results',
    type: GetDailyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async findAll(
    @Query() query?: GetDailyQueryDto,
  ): Promise<GetDailyResponseDto> {
    let dailys: Daily[];
    if (query) {
      dailys = await this.dailyService.findDailyQuery(query);
    } else {
      dailys = await this.dailyService.findAll();
    }

    const dailyOut: DailyOut[] = dailys.map((daily) =>
      this.dailyService.mapDailyToDailyOut(daily),
    );

    return {
      success: true,
      message: 'Daily results',
      data: dailyOut,
    };
  }

  @Get('/:id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('daily')
  @ApiOperation({ summary: 'Get a daily result' })
  @ApiFoundResponse({
    description: 'Daily result',
    type: GetDailyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Daily result not found',
    type: DefaultResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<GetDailyResponseDto> {
    const daily: Daily | null = await this.dailyService.findDailyById(+id);

    if (daily) {
      const dailyOut: DailyOut = this.dailyService.mapDailyToDailyOut(daily);
      return {
        success: true,
        message: 'Daily results',
        data: [dailyOut],
      };
    }
    throw new HttpException('Daily result not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('daily')
  @ApiOperation({ summary: 'Update a daily result' })
  @ApiCreatedResponse({
    description: 'Daily result updated',
    type: PostDailyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDailyDto: PatchDailyRequestDto,
  ): Promise<PostDailyResponseDto> {
    const daily: Daily | null = await this.dailyService.findDailyById(+id);

    if (daily) {
      const updatedDaily = await this.dailyService.update(+id, updateDailyDto);

      const dailyOut: DailyOut =
        this.dailyService.mapDailyToDailyOut(updatedDaily);
      return {
        success: true,
        message: 'Successfully updated daily result',
        data: dailyOut,
      };
    }
    throw new HttpException('Daily result not found', HttpStatus.NOT_FOUND);
  }
}
