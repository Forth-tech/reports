import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService, AuditService],
})
export class ClientModule {}
