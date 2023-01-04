import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../common/services/prisma.service';
import { AuditService } from '../common/services/audit.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AuditService],
})
export class ProductModule {}
