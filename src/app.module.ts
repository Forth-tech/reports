import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/services/prisma.service';
import { DailyModule } from './daily/daily.module';
import { PublicationModule } from './publication/publication.module';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { AdModule } from './ad/ad.module';
import { AdCampaignModule } from './ad-campaign/ad-campaign.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    DailyModule,
    AuthModule,
    UsersModule,
    PublicationModule,
    NetworkModule,
    AdModule,
    AdCampaignModule,
    RouterModule.register([
      {
        path: 'ad',
        module: AdModule,
        children: [{ path: 'campaign', module: AdCampaignModule }],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
