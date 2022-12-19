import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostTokenRevokeDto {
  @ApiProperty({
    description: 'Refresh token to be revoked.',
    example: 'token123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
