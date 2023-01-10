import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetDailyQueryDto {
  @ApiProperty({
    description: 'Network',
    example: 'FACEBOOK',
    enum: Network,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(Network)
  network: Network;

  @ApiProperty({
    description: 'Date of daily results',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    description: 'Date of daily results',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate: Date;
}
