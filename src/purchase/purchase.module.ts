import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService],
})
export class PurchaseModule {}
