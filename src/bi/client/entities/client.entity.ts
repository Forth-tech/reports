import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ClientOut {
  @ApiProperty({
    description: 'Client Name',
    example: 'Jakarta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Internal Code on Client',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;

  @ApiProperty({
    description: 'Client ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
