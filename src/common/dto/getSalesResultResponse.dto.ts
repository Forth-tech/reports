import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from './defaultResponse.dto';
import {
  SalesDailyResult,
  SalesMonthlyResult,
  SalesTotalResult,
  SalesWeeklyResult,
} from '../entities/salesResults.entity';

export class GetSalesResultResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Sales Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Sales',
    type: [SalesMonthlyResult],
    isArray: true,
  })
  @IsNotEmpty()
  data:
    | SalesMonthlyResult[]
    | SalesWeeklyResult[]
    | SalesDailyResult[]
    | SalesTotalResult;
}
