import { Injectable } from '@nestjs/common';
import { State } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { PostStateRequestDto } from './dto/postStateRequest.dto';
import { StateOut } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createStateDto: PostStateRequestDto): Promise<State> {
    return this.prismaService.state.create({
      data: createStateDto,
    });
  }

  async findAll(): Promise<State[]> {
    return this.prismaService.state.findMany();
  }

  async findOne(id: number): Promise<State | null> {
    return this.prismaService.state.findUnique({
      where: {
        id,
      },
    });
  }

  mapStateToStateOut(state: State): StateOut {
    return {
      id: state.id,
      name: state.name,
    };
  }
}
