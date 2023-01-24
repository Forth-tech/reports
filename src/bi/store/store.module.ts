import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, PrismaService, AuditService],
})
export class StoreModule {}
