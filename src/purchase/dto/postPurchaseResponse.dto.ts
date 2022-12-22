import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { PurchaseOut } from '../entities/purchase.entity';

export class PostPurchaseResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'City Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the city',
    example: {
      internalCode: '123456789',
      id_seller: 1,
      id_store: 1,
      nf: '1',
      id: 1,
    },
    type: PurchaseOut,
  })
  @IsNotEmpty()
  data: PurchaseOut;
}
