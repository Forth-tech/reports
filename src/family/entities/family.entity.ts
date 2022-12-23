import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FamilyOut {
  @ApiProperty({
    description: 'Family ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
