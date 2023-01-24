import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ItemOut {
  @ApiProperty({
    description: 'Item ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Purchase ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_purchase: number;

  @ApiProperty({
    description: 'Seller ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_product: number;

  @ApiProperty({
    description: 'Price of product in cents',
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Quantity purchase',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
