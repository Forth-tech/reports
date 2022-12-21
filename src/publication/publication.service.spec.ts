import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { PublicationService } from './publication.service';

describe('PublicationService', () => {
  let service: PublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationService, PrismaService],
    }).compile();

    service = module.get<PublicationService>(PublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
