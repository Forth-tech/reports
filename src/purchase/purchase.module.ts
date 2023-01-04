import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService, AuditService],
})
export class PurchaseModule {}
