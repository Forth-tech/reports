import { PartialType } from '@nestjs/swagger';
import { CreateAdGroupDto } from './createAdGroup.dto';

export class UpdateAdGroupDto extends PartialType(CreateAdGroupDto) {}
