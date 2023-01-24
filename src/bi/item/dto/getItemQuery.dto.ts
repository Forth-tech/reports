import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetItemsQueryDto {
  @ApiProperty({
    description: 'Purchase ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_purchase?: number;

  @ApiProperty({
    description: 'Seller ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_product?: number;
}
