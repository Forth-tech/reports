import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
<<<<<<< HEAD:src/bi/client/client.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/client/client.module.ts

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService, AuditService],
})
export class ClientModule {}
