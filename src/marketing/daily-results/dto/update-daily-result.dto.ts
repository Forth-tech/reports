import { PartialType } from '@nestjs/swagger';
import { CreateDailyResultDto } from './create-daily-result.dto';

export class UpdateDailyResultDto extends PartialType(CreateDailyResultDto) {}
