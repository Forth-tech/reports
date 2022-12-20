import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { PublicationOut } from '../entities/publication.entity';

export class GetPublicationsResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Post created successfully.',
  })
  message: string;

  @ApiProperty({
    description: 'Publication data.',
    example: [
      {
        id: 1,
        name: 'Publication 1',
        url: 'https://publication1.com',
        content: 'Publication 1 content',
        format: 'CARROUSSEL',
        network: 'FACEBOOK',
        date: '2021-01-01',
      },
    ],
  })
  data: PublicationOut[];
}
