import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class GetSellersAbcCurveQueryDto {
  @ApiProperty({
    description: 'Start date of the query',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  start_date?: Date;

  @ApiProperty({
    description: 'Start date of the query',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @ApiProperty({
    description: 'Products',
    example: 1,
    required: false,
    isArray: true,
    type: Number,
  })
  @IsOptional()
  products?: number[];
}
