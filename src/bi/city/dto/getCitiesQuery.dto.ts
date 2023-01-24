import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetCitiesQueryDto {
  @ApiProperty({
    description: 'State ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_state: number;

  @ApiProperty({
    description: 'Pagination',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  page: number;
}
