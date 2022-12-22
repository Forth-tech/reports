import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { State } from '@prisma/client';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetStateResponseDto } from './dto/getStateResponse.dto';
import { GetStatesResponseDto } from './dto/getStatesResponse.dto';
import { PostStateRequestDto } from './dto/postStateRequest.dto';
import { PostStateResponseDto } from './dto/postStateResponse.dto';
import { StateOut } from './entities/state.entity';
import { StateService } from './state.service';

@Controller('')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('state')
  @ApiOperation({ summary: 'State Created' })
  @ApiCreatedResponse({
    description: 'State created',
    type: PostStateResponseDto,
  })
  @ApiDefaultResponse({
    description: 'State not created',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostStateRequestDto })
  async create(
    @Body() createStateDto: PostStateRequestDto,
  ): Promise<PostStateResponseDto> {
    const state: State = await this.stateService.create(createStateDto);

    const stateOut: StateOut = this.stateService.mapStateToStateOut(state);

    return {
      success: true,
      message: 'State created',
      data: stateOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('state')
  @ApiOperation({ summary: 'States Found' })
  @ApiFoundResponse({
    description: 'States found',
    type: StateOut,
    isArray: true,
  })
  @ApiDefaultResponse({
    description: 'States not found',
    type: DefaultResponseDto,
  })
  async findAll(): Promise<GetStatesResponseDto> {
    const states: State[] = await this.stateService.findAll();

    const statesOut: StateOut[] = states.map((state: State) => {
      return this.stateService.mapStateToStateOut(state);
    });

    return {
      success: true,
      message: 'States found',
      data: statesOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('state')
  @ApiOperation({ summary: 'State Found' })
  @ApiFoundResponse({
    description: 'State found',
    type: GetStateResponseDto,
  })
  @ApiDefaultResponse({
    description: 'State not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number): Promise<GetStateResponseDto> {
    const state: State | null = await this.stateService.findOne(id);

    if (!state) {
      throw new HttpException('State not found', HttpStatus.NOT_FOUND);
    }

    const stateOut: StateOut = this.stateService.mapStateToStateOut(state);

    return {
      success: true,
      message: 'State found',
      data: stateOut,
    };
  }
}
