import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
<<<<<<< HEAD:src/bi/seller/dto/postSellerResponse.dto.ts
import { DefaultResponseDto } from '../../../common/dto/defaultResponse.dto';
=======
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/seller/dto/postSellerResponse.dto.ts
import { SellerOut } from '../entities/seller.entity';

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
