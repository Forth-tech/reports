import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { SellerOut } from '../entities/seller.entity';

export class GetSellersResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Seller Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Seller',
    example: [
      {
        id: 1,
        id_supervisor: 1,
        name: 'Seller Name',
        internalCode: 'Internal Code',
      },
    ],
    type: [SellerOut],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  data: SellerOut[];
}
