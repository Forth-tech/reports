import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { ItemOut } from '../entities/item.entity';

export class GetItemsResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Item Found',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Items',
    example: [
      {
        id_purchase: 1,
        id_product: 1,
        id: 1,
        price: 1,
        quantity: 1,
      },
    ],
    type: [ItemOut],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  data: ItemOut[];
}
