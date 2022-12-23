import { PartialType } from '@nestjs/swagger';
import { PostStoreRequestDto } from './postStoreRequest.dto';

export class PatchStoreRequestDto extends PartialType(PostStoreRequestDto) {}
