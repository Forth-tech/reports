import { PartialType } from '@nestjs/swagger';
import { CreateDailyDto } from './create-daily.dto';

export class UpdateDailyDto extends PartialType(CreateDailyDto) {}
