import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseDto {
  @ApiProperty({
    description: 'Whether the resquest was a success or not.',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message of the response.',
    example: 'Message describing the response.',
  })
  message: string;

  @ApiProperty({
    description:
      'Data related to the request, changes depending on the request.',
  })
  data: any;
}
