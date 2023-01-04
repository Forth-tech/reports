import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
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
import { Supervisor } from '@prisma/client';
import { AuditEventEnum } from '../common/enums/auditEventEnum';
import { FastifyRequestWithUser } from '../common/interfaces/customFastifyRequest';
import { AuditService } from '../common/services/audit.service';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { GetSupervisorResponseDto } from './dto/getSupervisorResponse.dto';
import { GetSupervisorsResponseDto } from './dto/getSupervisorsResponse.dto';
import { PostSupervisorRequestDto } from './dto/postSupervisorRequest.dto';
import { PostSupervisorResponseDto } from './dto/postSupervisorResponse.dto';
import { SupervisorOut } from './entities/supervisor.entity';
import { SupervisorService } from './supervisor.service';

@Controller('')
export class SupervisorController {
  constructor(
    private readonly supervisorService: SupervisorService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('supervisor')
  @ApiOperation({ summary: 'Create a new Supervisor' })
  @ApiCreatedResponse({
    description: 'Supervisor created',
    type: PostSupervisorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostSupervisorRequestDto })
  async create(
    @Request() req: FastifyRequestWithUser,
    @Body() createSupervisorDto: PostSupervisorRequestDto,
  ): Promise<PostSupervisorResponseDto> {
    const supervisor: Supervisor = await this.supervisorService.create(
      createSupervisorDto,
    );

    const supervisorOut: SupervisorOut =
      this.supervisorService.mapSupervisorToSupervisorOut(supervisor);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.SupervisorCreated,
      supervisorOut.id,
      JSON.stringify(supervisorOut),
    );

    return {
      success: true,
      message: 'Supervisor Created',
      data: supervisorOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Supervisor')
  @ApiOperation({ summary: 'Find all Supervisors' })
  @ApiFoundResponse({
    description: 'Supervisors found',
    type: GetSupervisorsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  async findAll(): Promise<GetSupervisorsResponseDto> {
    const supervisors: Supervisor[] = await this.supervisorService.findAll();

    const supervisorsOut: SupervisorOut[] = supervisors.map(
      (supervisor: Supervisor) =>
        this.supervisorService.mapSupervisorToSupervisorOut(supervisor),
    );

    return {
      success: true,
      message: 'Supervisors Found',
      data: supervisorsOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('product')
  @ApiOperation({ summary: 'Find a Supervisor by id' })
  @ApiFoundResponse({
    description: 'Supervisor found',
    type: GetSupervisorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Supervisor not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', description: 'Supervisor id', type: Number })
  async findOne(@Param('id') id: number): Promise<GetSupervisorResponseDto> {
    const supervisor: Supervisor | null = await this.supervisorService.findOne(
      id,
    );

    if (!supervisor) {
      throw new HttpException('Supervisor not found', HttpStatus.NOT_FOUND);
    }

    const supervisorOut: SupervisorOut =
      this.supervisorService.mapSupervisorToSupervisorOut(supervisor);

    return {
      success: true,
      message: 'Supervisor Found',
      data: supervisorOut,
    };
  }
}
