import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { AdCampaignOut } from '../entities/ad-campaign.entity';

export class GetAdCampaignResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'User created successfully.',
  })
  message: string;

  @ApiProperty({
    description: 'Ad Campaign Created',
    example: {
      id: 1,
      name: 'John',
      goal: 'SEGUIDORES',
      startDate: '2021-01-01',
    },
  })
  data: AdCampaignOut;
}
