// import fastifyCookie from "fastify-cookie";
import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './common/services/prisma.service';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { LoggingInterceptor } from './utils/loggin.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );
  app.enableCors();

  // Register cookie plugin. Allows us to use cookies in our requests.
  const cookieSecret = process.env.COOKIE_SECRET || '';
  app.register(fastifyCookie, {
    secret: cookieSecret,
  });

  // Override the default error handler.
  app.useGlobalFilters(new HttpExceptionFilter());

  // Add global logging interceptor.
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription(
      'Basic NestJS API to serve as a template for faster backend development.',
    )
    .setVersion('0.1')
    .addBearerAuth()
    .addTag('ping')
    .addTag('auth')
    .addTag('user')
    .build();

  const options: SwaggerDocumentOptions = {
    // Make sure that the library generates operation names
    // like 'createUser' instead of 'UserController_createUser'.
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      // Make sure that the authentication token persists after refreshing the page.
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('api', app, document, customOptions);

  // Fixing issues with enableShutdownHooks.
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Add a request validation pipeline to all requests.
  app.useGlobalPipes(
    new ValidationPipe({
      // Any property not included in the whitelist
      // is automatically stripped from the resulting object.
      whitelist: true,
      // Stop the request from processing when non-whitelisted
      // properties are present, and return an error
      // response to the user.
      forbidNonWhitelisted: true,
      // Transform payloads to be objects typed
      // according to their DTO classes.
      transform: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
