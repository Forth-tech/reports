import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  let service: NetworkService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkService, PrismaService],
    }).compile();

    service = module.get<NetworkService>(NetworkService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    const deleteAllNetwork = prisma.networks.deleteMany;

    await deleteAllNetwork();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be empty', async () => {
    const networks = await service.findAll();

    expect(networks).toBeDefined();
    expect(networks.length).toEqual(0);
  });

  it('should create a network', async () => {
    const network = await service.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.name).toEqual('Test Network');
    expect(network.url).toEqual('https://www.facebook.com/1');
    expect(network.network).toEqual('FACEBOOK');
  });

  it('should find network by id', async () => {
    const network = await service.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.name).toEqual('Test Network');
    expect(network.url).toEqual('https://www.facebook.com/1');
    expect(network.network).toEqual('FACEBOOK');

    const networkById = await service.findOne(network.id);

    expect(networkById).toBeDefined();
    expect(networkById.name).toEqual('Test Network');
    expect(networkById.url).toEqual('https://www.facebook.com/1');
    expect(networkById.network).toEqual('FACEBOOK');
  });

  it('should find all networks', async () => {
    const network1 = await service.create({
      name: 'Test Network 1',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network1).toBeDefined();
    expect(network1.name).toEqual('Test Network 1');
    expect(network1.url).toEqual('https://www.facebook.com/1');
    expect(network1.network).toEqual('FACEBOOK');

    const network2 = await service.create({
      name: 'Test Network 2',
      url: 'https://www.facebook.com/2',
      network: 'FACEBOOK',
    });

    expect(network2).toBeDefined();
    expect(network2.name).toEqual('Test Network 2');
    expect(network2.url).toEqual('https://www.facebook.com/2');
    expect(network2.network).toEqual('FACEBOOK');

    const networks = await service.findAll();

    expect(networks).toBeDefined();
    expect(networks.length).toEqual(2);
    expect(networks[0].name).toEqual('Test Network 1');
    expect(networks[0].url).toEqual('https://www.facebook.com/1');
    expect(networks[0].network).toEqual('FACEBOOK');
    expect(networks[1].name).toEqual('Test Network 2');
    expect(networks[1].url).toEqual('https://www.facebook.com/2');
    expect(networks[1].network).toEqual('FACEBOOK');
  });
});
