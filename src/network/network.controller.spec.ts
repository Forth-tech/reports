import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe('NetworkController', () => {
  let controller: NetworkController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkController],
      providers: [NetworkService, PrismaService],
    }).compile();

    controller = module.get<NetworkController>(NetworkController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    const deleteAllNetwork = prisma.networks.deleteMany;

    await deleteAllNetwork();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a network', async () => {
    const network = await controller.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.success).toEqual(true);
    expect(network.message).toEqual('Network created');
    expect(network.data.name).toEqual('Test Network');
    expect(network.data.url).toEqual('https://www.facebook.com/1');
    expect(network.data.network).toEqual('FACEBOOK');
  });

  it('should error create same name network', async () => {
    const network = await controller.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.success).toEqual(true);
    expect(network.message).toEqual('Network created');
    expect(network.data.name).toEqual('Test Network');
    expect(network.data.url).toEqual('https://www.facebook.com/1');
    expect(network.data.network).toEqual('FACEBOOK');

    const error = await getError<Error>(() =>
      controller.create({
        name: 'Test Network',
        url: 'https://www.facebook.com/1',
        network: 'FACEBOOK',
      }),
    );

    expect(error).toBeDefined();
  });

  it('should find network by id', async () => {
    const network = await controller.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.success).toEqual(true);
    expect(network.message).toEqual('Network created');
    expect(network.data.name).toEqual('Test Network');
    expect(network.data.url).toEqual('https://www.facebook.com/1');
    expect(network.data.network).toEqual('FACEBOOK');

    const networkById = await controller.findOne(network.data.id.toString());

    expect(networkById).toBeDefined();
    expect(networkById.success).toEqual(true);
    expect(networkById.message).toEqual('Network found');
    expect(networkById.data.name).toEqual('Test Network');
    expect(networkById.data.url).toEqual('https://www.facebook.com/1');
    expect(networkById.data.network).toEqual('FACEBOOK');
  });

  it('should error upon not finding network by id', async () => {
    const error: Error = await getError(async () => controller.findOne('1'));

    expect(error).toBeInstanceOf(HttpException);
    expect(error.message).toEqual('Network not found');
  });

  it('should find all networks', async () => {
    const network = await controller.create({
      name: 'Test Network',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network).toBeDefined();
    expect(network.success).toEqual(true);
    expect(network.message).toEqual('Network created');
    expect(network.data.name).toEqual('Test Network');
    expect(network.data.url).toEqual('https://www.facebook.com/1');
    expect(network.data.network).toEqual('FACEBOOK');

    const network1 = await controller.create({
      name: 'Test Network 1',
      url: 'https://www.facebook.com/1',
      network: 'FACEBOOK',
    });

    expect(network1).toBeDefined();
    expect(network1.success).toEqual(true);
    expect(network1.message).toEqual('Network created');
    expect(network1.data.name).toEqual('Test Network 1');
    expect(network1.data.url).toEqual('https://www.facebook.com/1');
    expect(network1.data.network).toEqual('FACEBOOK');

    const networks = await controller.findAll();

    expect(networks).toBeDefined();
    expect(networks.success).toEqual(true);
    expect(networks.message).toEqual('Networks found');
    expect(networks.data.length).toEqual(2);
    expect(networks.data[0].name).toEqual('Test Network');
    expect(networks.data[0].url).toEqual('https://www.facebook.com/1');
    expect(networks.data[0].network).toEqual('FACEBOOK');
    expect(networks.data[1].name).toEqual('Test Network 1');
    expect(networks.data[1].url).toEqual('https://www.facebook.com/1');
    expect(networks.data[1].network).toEqual('FACEBOOK');
  });
});
