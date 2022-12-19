import { ApiProperty } from '@nestjs/swagger';
import { Format, Network } from '@prisma/client';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class GetPublicationsQueryDto {
  @ApiProperty({
    description: 'Network',
    example: 'FACEBOOK',
    enum: Network,
    required: false,
  })
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

  @ApiProperty({
    description: 'Date of daily results',
    example: '2021-01-01',
    required: false,
  })
  @IsEnum(Format)
  @IsOptional()
  format: Format;
}
