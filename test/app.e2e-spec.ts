import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  let token: string;

  let baseUser = {
    email: 'johndoe@fake.com',
    password: 'password',
    name: 'name'
  };
  
  let baseUrl = 'http://localhost:3000';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    const loginRes = await request(app.getHttpServer()).post('/auth/login').send(baseUser);

    token = loginRes.body.data.access_token;
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(baseUrl)
      .get('/ping')
      .expect(200)
      .expect({
        success: true,
        message: 'pong',
        data: null
      });
  });

  // Network
  it('/network (POST)', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/network',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        name: 'Test Network',
        url: 'https://test.network',
        network: 'FACEBOOK',
      },
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBe({
        success: true,
        message: 'Network created',
        data: {
          id: 1,
          name: 'Test Network',
          url: 'https://test.network',
          network: 'FACEBOOK',
        },
      });
  });
});
