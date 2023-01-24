import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostSellerRequestDto {
  @ApiProperty({
    description: 'Supervisor ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id_supervisor: number;

  @ApiProperty({
    description: 'Seller Name',
    example: 'Seller Name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Internal Code',
    example: 'Internal Code',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  internalCode: string;
}
