import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from '../../../src/common/dto/defaultResponse.dto';
import { NetworkOut } from '../entities/network.entity';

export class GetNetworksResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Network created successfully.',
  })
  message: string;

  @ApiProperty({
    description: 'Publication data.',
    example: [
      {
        id: 1,
        name: 'Publication 1',
        url: 'https://publication1.com',
        network: 'FACEBOOK',
      },
    ],
  })
  data: NetworkOut[];
}
