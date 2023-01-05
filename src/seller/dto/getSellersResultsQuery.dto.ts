import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetSellersResultsQueryDto {
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
    description: 'Format of the query',
    example: 'monthly',
    required: false,
  })
  @IsString()
  @IsEnum(['monthly', 'weekly', 'daily', 'total'])
  @IsOptional()
  format: string = 'monthly';

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
