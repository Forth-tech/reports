import { PartialType } from '@nestjs/swagger';
import { PostPublicationRequestDto } from './postPublicationRequest.dto';

export class PatchPublicationRequestDto extends PartialType(
  PostPublicationRequestDto,
) {}
