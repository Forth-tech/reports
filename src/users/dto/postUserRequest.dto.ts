import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
