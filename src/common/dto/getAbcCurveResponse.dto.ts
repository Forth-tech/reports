import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from './defaultResponse.dto';
import { ClientAbcCurve } from '../entities/clientAbcCurve.entity';

export class GetAbcCurveResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Seller Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Seller',
    type: ClientAbcCurve,
  })
  @IsNotEmpty()
  data: ClientAbcCurve;
}
