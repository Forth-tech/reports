import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
<<<<<<< HEAD:src/bi/supervisor/supervisor.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/supervisor/supervisor.module.ts

@Module({
  controllers: [SupervisorController],
  providers: [SupervisorService, PrismaService, AuditService],
})
export class SupervisorModule {}
