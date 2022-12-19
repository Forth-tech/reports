import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { DailyOut } from '../entities/dailyOut.entity';

export class GetDailyResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'User logged in successfully.',
  })
  message: string;

  @ApiProperty({
    description: 'Data containing the access token for the user.',
    example: {
      access_token: 'token124',
    },
  })
  data: DailyOut[];
}
