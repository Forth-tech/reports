import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
<<<<<<< HEAD:src/bi/store/store.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/store/store.module.ts

@Module({
  controllers: [StoreController],
  providers: [StoreService, PrismaService, AuditService],
})
export class StoreModule {}
