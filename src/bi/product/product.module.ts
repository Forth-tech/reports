import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
<<<<<<< HEAD:src/bi/product/product.module.ts
import { PrismaService } from '../../common/services/prisma.service';
import { AuditService } from '../../common/services/audit.service';
=======
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27:src/product/product.module.ts

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AuditService],
})
export class ProductModule {}
