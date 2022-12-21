import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Create Users", () => {
    it('should create a user', async () => {
      expect(await service.createUser(
        'name',
        'johndoe@fake.com',
        'hashedPassword',
        'hash'
      )).toBeDefined();
  })});

  it('should return a user', async () => {
    expect(await service.findUserByEmail('johndoe@fake.com')).toBeDefined();
  });
});
