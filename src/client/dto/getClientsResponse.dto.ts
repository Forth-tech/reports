import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { ClientOut } from '../entities/client.entity';

export class GetClientsResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message',
    example: 'Client Created',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Client',
    required: true,
    type: ClientOut,
    isArray: true,
    example: {
      id: 1,
      name: 'Jakarta',
      internalCode: '1',
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: ClientOut[];
}
