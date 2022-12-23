import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostClientRequestDto {
  @ApiProperty({
    description: 'Client Name',
    example: 'Jakarta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Client Internal Code',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;
}
