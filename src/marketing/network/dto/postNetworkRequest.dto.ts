import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';

export class PostNetworkRequestDto {
  @ApiProperty({
    description: 'Network Name',
    example: 'Facebook',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Network URL',
    example: 'https://www.facebook.com/1',
    required: true,
  })
  url: string;

  @ApiProperty({
    description: 'Network Type',
    example: Network.FACEBOOK,
    required: true,
    enum: Network,
  })
  network: Network;
}
