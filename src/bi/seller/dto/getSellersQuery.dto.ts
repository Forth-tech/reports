import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetSellersQueryDto {
  @ApiProperty({
    description: 'Supervisor ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id_supervisor?: number;
}
