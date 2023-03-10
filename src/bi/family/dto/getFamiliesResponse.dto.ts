import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { FamilyOut } from '../entities/family.entity';

export class GetFamiliesResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Family Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Family',
    example: [
      {
        id: 1,
        name: 'Family Name',
        internalCode: 'Internal Code',
      },
    ],
    type: [FamilyOut],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  data: FamilyOut[];
}
