import { Injectable } from '@nestjs/common';
import { Audit } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  // Create a new audit log entry.
  async createAuditLog(
    userId: number,
    auditEvent: number,
    externalId: number,
    information: string,
  ): Promise<Audit> {
    return this.prisma.audit.create({
      data: {
        id_auditevent: auditEvent,
        id_external: externalId,
        information: information,
        id_user: userId,
      },
    });
  }
}
