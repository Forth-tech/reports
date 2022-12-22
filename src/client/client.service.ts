import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { PostClientRequestDto } from './dto/postClientRequest.dto';
import { ClientOut } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClientDto: PostClientRequestDto): Promise<Client> {
    return this.prismaService.client.create({
      data: {
        name: createClientDto.name,
        internalCode: createClientDto.internalCode,
      },
    });
  }

  async findAll(): Promise<Client[]> {
    return this.prismaService.client.findMany();
  }

  async findOne(id: number): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  mapClientToClientOut(client: Client): ClientOut {
    return {
      id: client.id,
      name: client.name,
      internalCode: client.internalCode,
    };
  }
}
