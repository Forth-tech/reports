import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { StateOut } from '../entities/state.entity';

export class GetStatesResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'State Found',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the State',
    example: {
      name: 'Jakarta',
      id: 1,
    },
    type: Array<StateOut>,
  })
  @IsNotEmpty()
  data: StateOut[];
}
