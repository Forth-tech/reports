import { ApiProperty } from '@nestjs/swagger';
import { Format, Network } from '@prisma/client';

export class PostPublicationRequestDto {
  @ApiProperty({
    description: 'Publication Name',
    example: 1,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Publication URL',
    example: 1,
    required: true,
  })
  url: string;

  @ApiProperty({
    description: 'Publication URL',
    example: 1,
    required: false,
  })
  content: string;

  @ApiProperty({
    description: 'Publication Format type',
    example: Format.CARROUSSEL,
    enum: Format,
    required: true,
  })
  format: Format;

  @ApiProperty({
    description: 'Network',
    example: 'FACEBOOK',
    enum: Network,
    required: true,
  })
  network: Network;

  @ApiProperty({
    description: 'Date of Publication',
    example: '2021-01-01',
    required: true,
  })
  date: Date;

  @ApiProperty({
    description: 'Gained followers on post',
    example: 100,
    required: false,
  })
  gainedFollowers: number;

  @ApiProperty({
    description: 'Clicks on post',
    example: 100,
    required: false,
  })
  clicks: number;

  @ApiProperty({
    description: 'Impressions of post',

    example: 100,
    required: false,
  })
  impressions: number;

  @ApiProperty({
    description: 'Reach of post',
    example: 100,
    required: false,
  })
  reach: number;

  @ApiProperty({
    description: 'Likes on post',
    example: 100,
    required: false,
  })
  likes: number;

  @ApiProperty({
    description: 'Shares on post',
    example: 100,
    required: false,
  })
  shares: number;

  @ApiProperty({
    description: 'Saves on post',
    example: 100,
    required: false,
  })
  saves: number;

  @ApiProperty({
    description: 'Profile access',
    example: 100,
    required: false,
  })
  profileAccess: number;
}
