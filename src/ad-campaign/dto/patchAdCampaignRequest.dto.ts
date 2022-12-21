import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class PatchAdCampaignRequestDto {
  @ApiProperty({
    description: 'Name of the campaign.',
    example: 'Teste XPTO',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Goal of the Campaign',
    example: 'SEGUIDORES',
    required: false,
  })
  @IsString()
  @IsOptional()
  goal: string;

  @ApiProperty({
    description: 'Goal of the Campaign as of the network.',
    example: 'SEGUIDORES',
    required: false,
  })
  @IsString()
  @IsOptional()
  networkGoal: string;

  @ApiProperty({
    description: 'Name of the Campaign as of the network.',
    example: 'Teste XPTO',
    required: false,
  })
  @IsString()
  @IsOptional()
  networkName: string;

  @ApiProperty({
    description: 'ID of the campaign as of the network.',
    example: '123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  networkId: string;

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
