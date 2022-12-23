import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetProductsQueryDto {
  @ApiProperty({
    description: 'Family ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_family?: number;
}
