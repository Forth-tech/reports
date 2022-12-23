import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { SellerOut } from '../entities/Seller.entity';

export class PostSellerResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Seller Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Seller',
    example: {
      id: 1,
      id_supervisor: 1,
      name: 'Seller Name',
      internalCode: 'Internal Code',
    },
    type: SellerOut,
  })
  @IsNotEmpty()
  data: SellerOut;
}
