import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPurchasesQueryDto {
  @ApiProperty({
    description: 'Store ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_store?: number;

  @ApiProperty({
    description: 'Seller ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_seller?: number;
}
