import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostSupervisorRequestDto {
  @ApiProperty({
    description: 'Supervisor Name',
    example: 'Supervisor Name',
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
