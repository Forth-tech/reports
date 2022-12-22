import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { CityOut } from '../entities/city.entity';

export class GetCitiesResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'City Found',
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
    type: Array<CityOut>,
  })
  @IsNotEmpty()
  data: CityOut[];
}
