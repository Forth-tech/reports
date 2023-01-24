import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
<<<<<<< HEAD:src/bi/seller/seller.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/seller/seller.module.ts

@Module({
  controllers: [SellerController],
  providers: [SellerService, PrismaService, AuditService],
})
export class SellerModule {}
