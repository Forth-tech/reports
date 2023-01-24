import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
import { StoreOut } from '../entities/store.entity';

export class PatchStoreResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message',
    example: 'Store Created',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Store',
    required: true,
    type: StoreOut,
    example: {
      id: 1,
      name: 'Jakarta',
      internalCode: '1',
      id_seller: 1,
      id_city: 1,
      id_client: 1,
    },
  })
  @IsObject()
  @IsNotEmpty()
  data: StoreOut;
}
