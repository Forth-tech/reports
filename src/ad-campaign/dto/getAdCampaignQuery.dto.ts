import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class GetAdCampaignQueryDto {
  @ApiProperty({
    description: 'Goal of the Campaign',
    example: 'SEGUIDORES',
    required: false,
  })
  @IsString()
  @IsOptional()
  goal: string;

  @ApiProperty({
    description: 'Start date of the campaign',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the campaign',
    example: '2021-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate: Date;
}
