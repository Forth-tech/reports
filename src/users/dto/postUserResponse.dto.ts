import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { UserOutDto } from './userOut.dto';

export class PostUserResponseDto extends DefaultResponseDto {
    @ApiProperty({
        description: 'Message of the response.',
        example: 'User created successfully.',
    })
    message: string;

    @ApiProperty({
        description: 'User Data',
        example: {
            id: 1,
            name: 'John',
            email: 'johndoe@fake.com',
        },
    })
    data: UserOutDto;
}