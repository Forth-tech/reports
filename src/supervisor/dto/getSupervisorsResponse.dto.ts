import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultResponseDto } from '../../common/dto/defaultResponse.dto';
import { SupervisorOut } from '../entities/supervisor.entity';

export class GetSupervisorsResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: 'Message of the response.',
    example: 'Supervisor Created',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data containing the Supervisor',
    example: [
      {
        id: 1,
        name: 'Supervisor Name',
        internalCode: 'Internal Code',
      },
    ],
    type: [SupervisorOut],
    isArray: true,
  })
  @IsNotEmpty()
  data: SupervisorOut[];
}
