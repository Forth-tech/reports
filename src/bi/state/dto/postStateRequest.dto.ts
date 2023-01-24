import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostStateRequestDto {
  @ApiProperty({
    description: 'State Name',
    example: 'Jakarta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
