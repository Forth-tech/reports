import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { ClientOut } from '../entities/client.entity';

export class GetClientResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message',
    example: 'Client Found',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Client',
    required: true,
    type: ClientOut,
    example: {
      id: 1,
      name: 'Jakarta',
      internalCode: '1',
    },
  })
  @IsNotEmpty()
  data: ClientOut;
}
