import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { StoreOut } from '../entities/store.entity';

export class GetStoresResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message',
    example: 'Store Found',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Store',
    required: true,
    type: [StoreOut],
    isArray: true,
    example: [
      {
        id: 1,
        name: 'Jakarta',
        internalCode: '1',
        id_seller: 1,
        id_city: 1,
        id_client: 1,
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  data: StoreOut[];
}
