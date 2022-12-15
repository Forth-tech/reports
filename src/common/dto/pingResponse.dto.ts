import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from './defaultResponse.dto';

export class PingResponseDto extends DefaultResponseDto {
    @ApiProperty({
        description: 'Message of the response.',
        example: 'pong',
    })
    message: string;

    @ApiProperty({
        description: 'No data is sent back for this request.',
        example: null,
    })
    data: null;
}