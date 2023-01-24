import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { CityOut } from '../entities/city.entity';

export class PostCityResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'City Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the city',
    example: {
      name: 'Jakarta',
      id_state: 1,
      id: 1,
    },
    type: CityOut,
  })
  @IsNotEmpty()
  data: CityOut;
}
