import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
<<<<<<< HEAD:src/bi/item/item.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/item/item.module.ts

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService, AuditService],
})
export class ItemModule {}
