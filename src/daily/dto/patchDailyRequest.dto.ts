import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class PatchDailyRequestDto {
  @ApiProperty({
    description: 'Daily gained followers',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  gainedFollowers: number;

  @ApiProperty({
    description: 'Daily lost followers',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  lostFollowers: number;

  @ApiProperty({
    description: 'Daily invested value (in cents)',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  investedValue: number;

  @ApiProperty({
    description: 'Daily clicks',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  clicks: number;

  @ApiProperty({
    description: 'Daily impressions',

    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  impressions: number;

  @ApiProperty({
    description: 'Daily reach',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  reach: number;
}
