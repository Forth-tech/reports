import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostStoreRequestDto {
  @ApiProperty({
    description: 'Client Name',
    example: 'Jakarta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Client Internal Code',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;

  @ApiProperty({
    description: 'ID of Client',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_client: number;

  @ApiProperty({
    description: 'ID of City',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_city: number;

  @ApiProperty({
    description: 'ID of Seller',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_seller: number;
}
