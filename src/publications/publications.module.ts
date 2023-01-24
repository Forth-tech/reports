import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { FacebookService } from '../common/services/facebook.service';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PrismaService, AuditService, FacebookService],
})
export class PublicationsModule {}
