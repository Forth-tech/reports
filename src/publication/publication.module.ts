import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PrismaService],
})
export class PublicationModule {}
