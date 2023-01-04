import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService, AuditService],
})
export class ItemModule {}
