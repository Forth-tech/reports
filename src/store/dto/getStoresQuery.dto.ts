import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetStoresQueryDto {
  @ApiProperty({
    description: 'ID of Client',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_client?: number;

  @ApiProperty({
    description: 'ID of City',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_city?: number;

  @ApiProperty({
    description: 'ID of Seller',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_seller?: number;
}
