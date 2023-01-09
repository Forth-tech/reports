import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PostUserRequestDto {
  @ApiProperty({
    description: 'Name of the user.',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user.',
    example: 'johndoe@fake.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user.',
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'SELLER',
    required: true,
    enum: Roles,
  })
  @IsString()
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;
}
