import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { ProductOut } from '../entities/product.entity';

export class GetProductsResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Product Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Product',
    example: {
      id_family: 1,
      name: 'Product Name',
      internalCode: 'Internal Code',
    },
    type: [ProductOut],
    isArray: true,
  })
  @IsNotEmpty()
  data: ProductOut[];
}
