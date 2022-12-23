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
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultResponseDto } from '../common/dto/defaultResponse.dto';
import { JwtAccessTokenAuthGuard } from '../auth/jwt-access-token.guard';
import { ClientService } from './client.service';
import { PostClientRequestDto } from './dto/postClientRequest.dto';
import { PostClientResponseDto } from './dto/postClientResponse.dto';
import { Client } from '@prisma/client';
import { ClientOut } from './entities/client.entity';
import { GetClientResponseDto } from './dto/getClientResponse.dto';
import { GetClientsResponseDto } from './dto/getClientsResponse.dto';

@Controller('')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
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
    @Body() createClientDto: PostClientRequestDto,
  ): Promise<PostClientResponseDto> {
    const client: Client = await this.clientService.create(createClientDto);

    const clientOut: ClientOut =
      this.clientService.mapClientToClientOut(client);

    return {
      success: true,
      message: 'Client created',
      data: clientOut,
    };
  }

  @Get()
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Clients Found' })
  @ApiFoundResponse({
    description: 'Client created',
    type: GetClientsResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not created',
    type: DefaultResponseDto,
  })
  async findAll(): Promise<GetClientsResponseDto> {
    const clients: Client[] = await this.clientService.findAll();

    const clientsOut: ClientOut[] = clients.map((client: Client) =>
      this.clientService.mapClientToClientOut(client),
    );

    return {
      success: true,
      message: 'Clients found',
      data: clientsOut,
    };
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @ApiCookieAuth()
  @ApiTags('client')
  @ApiOperation({ summary: 'Client Found' })
  @ApiFoundResponse({
    description: 'Client created',
    type: GetClientResponseDto,
  })
  @ApiDefaultResponse({
    description: 'Client not created',
    type: DefaultResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Client not found',
    type: DefaultResponseDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number): Promise<GetClientResponseDto> {
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