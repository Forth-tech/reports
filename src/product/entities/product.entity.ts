import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductOut {
  @ApiProperty({
    description: 'Item ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Family ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_family: number;

  @ApiProperty({
    description: 'Product Name',
    example: 'Product Name',
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
