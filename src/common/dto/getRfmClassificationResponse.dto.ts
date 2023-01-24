import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from './defaultResponse.dto';
import { RfmClassification } from '../entities/rfmClassification.entity';

export class GetRfmClassificationResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Seller Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Seller',
    type: RfmClassification,
  })
  @IsNotEmpty()
  data: RfmClassification[];
}
