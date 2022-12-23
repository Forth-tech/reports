import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostFamilyRequestDto {
  @ApiProperty({
    description: 'Family Name',
    example: 'Family Name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Internal Code',
    example: 'Internal Code',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;
}
