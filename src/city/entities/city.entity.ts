import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CityOut {
  @ApiProperty({
    description: 'City Name',
    example: 'Jakarta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'State ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_state: number;

  @ApiProperty({
    description: 'City ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
