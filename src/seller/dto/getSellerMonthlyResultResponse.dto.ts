import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { SellerDailyResult, SellerMonthlyResult, SellerTotalResult, SellerWeeklyResult } from '../entities/sellerMontlhyResult.entity';

export class GetSellerMonthlyResultResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Seller Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Seller',
    type: [SellerMonthlyResult],
    isArray: true,
  })
  @IsNotEmpty()
  data: SellerMonthlyResult[] | SellerWeeklyResult[] | SellerDailyResult[] | SellerTotalResult;
}
