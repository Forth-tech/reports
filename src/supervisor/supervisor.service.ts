import { Injectable } from '@nestjs/common';
import { Supervisor } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { PostSupervisorRequestDto } from './dto/postSupervisorRequest.dto';
import { SupervisorOut } from './entities/supervisor.entity';

@Injectable()
export class SupervisorService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createSupervisorDto: PostSupervisorRequestDto,
  ): Promise<Supervisor> {
    return this.prismaService.supervisor.create({
      data: {
        name: createSupervisorDto.name,
        internalCode: createSupervisorDto.internalCode,
      },
    });
  }

  async findAll(): Promise<Supervisor[]> {
    return this.prismaService.supervisor.findMany();
  }

  async findOne(id: number): Promise<Supervisor | null> {
    return this.prismaService.supervisor.findUnique({
      where: {
        id,
      },
    });
  }

  mapSupervisorToSupervisorOut(supervisor: Supervisor): SupervisorOut {
    return {
      id: supervisor.id,
      name: supervisor.name,
      internalCode: supervisor.internalCode,
    };
  }
}
