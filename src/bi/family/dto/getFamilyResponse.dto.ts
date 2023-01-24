import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { FamilyOut } from '../entities/family.entity';

export class GetFamilyResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Family Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Family',
    example: {
      id: 1,
      name: 'Family Name',
      internalCode: 'Internal Code',
    },
    type: FamilyOut,
  })
  @IsNotEmpty()
  data: FamilyOut;
}
