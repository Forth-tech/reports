import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';

export class DailyOut {
  @ApiProperty({
    description: 'Daily Id',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Network',
    example: 'FACEBOOK',
    enum: Network,
    required: true,
  })
  network: Network;

  @ApiProperty({
    description: 'Date of daily results',
    example: '2021-01-01',
    required: true,
  })
  date: Date;

  @ApiProperty({
    description: 'Daily gained followers',
    example: 100,
    required: false,
  })
  gainedFollowers: number;

  @ApiProperty({
    description: 'Daily lost followers',
    example: 100,
    required: false,
  })
  lostFollowers: number;

  @ApiProperty({
    description: 'Daily invested value (in cents)',
    example: 100,
    required: false,
  })
  investedValue: number;

  @ApiProperty({
    description: 'Daily clicks',
    example: 100,
    required: false,
  })
  clicks: number;

  @ApiProperty({
    description: 'Daily impressions',

    example: 100,
    required: false,
  })
  impressions: number;

  @ApiProperty({
    description: 'Daily reach',
    example: 100,
    required: false,
  })
  reach: number;
}
