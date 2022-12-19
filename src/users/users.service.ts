import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserOutDto } from './dto/userOut.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async createUser(
    name: string,
    email: string,
    hashedPassword: string,
    salt: string,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name,
        email,
        hashedPassword,
        hash: salt,
      },
    });
  }

  mapUserToUserOut(user: User): UserOutDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async saltAndHashPassword(
    password: string,
  ): Promise<{ salt: string; hash: string }> {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);
    return { salt, hash };
  }
}
