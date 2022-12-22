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
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    DailyModule,
    AuthModule,
    UsersModule,
    PublicationModule,
    NetworkModule,
    AdModule,
    AdCampaignModule,
    CityModule,
    RouterModule.register([
      {
        path: 'ad',
        module: AdModule,
        children: [{ path: 'campaign', module: AdCampaignModule }],
      },
    ]),
    RouterModule.register([
      {
        path: 'bi',
        children: [{ path: 'city', module: CityModule }],
      },
    ]),
    StateModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
