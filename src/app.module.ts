import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/services/prisma.service';
import { DailyModule } from './daily/daily.module';
import { PublicationModule } from './publication/publication.module';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [
    DailyModule,
    AuthModule,
    UsersModule,
    PublicationModule,
    NetworkModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
