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
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { JwtAccessTokenAuthGuard } from '../../auth/jwt-access-token.guard';
import { ClientService } from './client.service';
import { PostClientRequestDto } from './dto/postClientRequest.dto';
import { PostClientResponseDto } from './dto/postClientResponse.dto';
import { Client } from '@prisma/client';
import { ClientOut } from './entities/client.entity';
import { GetClientResponseDto } from './dto/getClientResponse.dto';
import { GetClientsResponseDto } from './dto/getClientsResponse.dto';
import { AuditService } from '../../common/services/audit.service';
import { FastifyRequestWithUser } from '../../common/interfaces/customFastifyRequest';
import { AuditEventEnum } from '../../common/enums/auditEventEnum';
import { RfmClassification } from '../../common/entities/rfmClassification.entity';
import { GetRfmClassificationResponseDto } from '../../common/dto/getRfmClassificationResponse.dto';
import { grantPermission } from '../../utils/grantPermission.guard';

@Controller('')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Client Created' })
  @ApiCreatedResponse({
    description: 'Client created',
    type: PostClientResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not created',
    type: DefaultResponseDto,
  })
  @ApiBody({ type: PostClientRequestDto })
  async create(
    @Request() req: FastifyRequestWithUser,
    @Body() createClientDto: PostClientRequestDto,
  ): Promise<PostClientResponseDto> {
    const client: Client = await this.clientService.create(createClientDto);

    const clientOut: ClientOut =
      this.clientService.mapClientToClientOut(client);

    this.auditService.createAuditLog(
      req.user.id,
      AuditEventEnum.ClientCreated,
      client.id,
      JSON.stringify(clientOut),
    );

    return {
      success: true,
      message: 'Client created',
      data: clientOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Clients Found' })
  @ApiFoundResponse({
    description: 'Client found',
    type: GetClientsResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not found',
    type: DefaultResponseDto,
  })
  async findAll(
    @Request() req: FastifyRequestWithUser,
  ): Promise<GetClientsResponseDto> {
    const clients: Client[] = await this.clientService.findAll(req.user);

    const clientsOut: ClientOut[] = clients.map((client: Client) =>
      this.clientService.mapClientToClientOut(client),
    );

    return {
      success: true,
      message: 'Clients found',
      data: clientsOut,
    };
  }

  @Get('/rfm')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Clients Found' })
  @ApiFoundResponse({
    description: 'Client found',
    type: GetRfmClassificationResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not found',
    type: DefaultResponseDto,
  })
  async getRfm(
    @Request() req: FastifyRequestWithUser,
  ): Promise<GetRfmClassificationResponseDto> {
    const rfmClassification: RfmClassification[] =
      await this.clientService.getRfmClassification();

    return {
      success: true,
      message: 'Clients found',
      data: rfmClassification,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiBearerAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Client Found' })
  @ApiFoundResponse({
    description: 'Client found',
    type: GetClientResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not found',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Client not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(
    @Request() req: FastifyRequestWithUser,
    @Param('id') id: number,
  ): Promise<GetClientResponseDto> {
    if (!(await grantPermission('purchase', 'GET', id, req.user))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const client: Client | null = await this.clientService.findOne(id);

    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    const clientOut: ClientOut =
      this.clientService.mapClientToClientOut(client);

    return {
      success: true,
      message: 'Client found',
      data: clientOut,
    };
  }
}
