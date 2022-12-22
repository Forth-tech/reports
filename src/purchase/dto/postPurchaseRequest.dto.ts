import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostPurchaseRequestDto {
  @ApiProperty({
    description: 'Internal code of purchase',
    example: '123456789',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;

  @ApiProperty({
    description: 'Store ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_store: number;

  @ApiProperty({
    description: 'Seller ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_seller: number;

  @ApiProperty({
    description: 'NF',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nf: string;
}
