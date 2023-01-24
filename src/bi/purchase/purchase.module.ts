import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
<<<<<<< HEAD:src/bi/purchase/purchase.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/purchase/purchase.module.ts

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService, AuditService],
})
export class PurchaseModule {}
