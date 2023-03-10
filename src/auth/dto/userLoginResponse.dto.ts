import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';

export class UserLoginResponseDto extends DefaultResponseDto {
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
  data: {
    access_token: string;
    email?: string;
    Role?: Roles;
    name?: string;
  };
}
