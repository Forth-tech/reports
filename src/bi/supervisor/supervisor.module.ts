import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';

@Module({
  controllers: [SupervisorController],
  providers: [SupervisorService, PrismaService, AuditService],
})
export class SupervisorModule {}
