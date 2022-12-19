import { Controller, Get, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { PingResponseDto } from './common/dto/pingResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiTags('ping')
  @ApiOperation({ summary: 'Checks if the API server is up and running.' })
  @ApiResponse({
    status: 200,
    description: 'API server is up and running.',
    type: PingResponseDto,
  })
  async getPing(@Response() reply: FastifyReply): Promise<void> {
    reply.status(200).send({
      success: true,
      message: 'pong',
      data: null,
    });
  }
}
