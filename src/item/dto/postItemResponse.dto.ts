import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { ItemOut } from '../entities/item.entity';

export class PostItemResponseDto extends DefaultResponseDto {
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
      id_purchase: 1,
      id_product: 1,
      id: 1,
      price: 1,
      quantity: 1,
    },
    type: ItemOut,
  })
  @IsNotEmpty()
  data: ItemOut;
}
