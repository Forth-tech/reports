import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostAdCampaignRequestDto {
  @ApiProperty({
    description: 'Name of the campaign.',
    example: 'Teste XPTO',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  networkId: string;
}
