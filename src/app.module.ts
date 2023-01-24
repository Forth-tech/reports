import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/services/prisma.service';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './marketing/network/network.module';
import { AdModule } from './marketing/ad/ad.module';
import { AdCampaignModule } from './marketing/ad-campaign/ad-campaign.module';
import { RouterModule } from '@nestjs/core';
import { CityModule } from './bi/city/city.module';
import { StateModule } from './bi/state/state.module';
import { ClientModule } from './bi/client/client.module';
import { StoreModule } from './bi/store/store.module';
import { PurchaseModule } from './bi/purchase/purchase.module';
import { ItemModule } from './bi/item/item.module';
import { ProductModule } from './bi/product/product.module';
import { FamilyModule } from './bi/family/family.module';
import { SellerModule } from './bi/seller/seller.module';
import { SupervisorModule } from './bi/supervisor/supervisor.module';
import { AuditService } from './common/services/audit.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AdGroupModule } from './marketing/ad-group/ad-group.module';
import { DailyResultsModule } from './marketing/daily-results/daily-results.module';
import { PublicationsModule } from './marketing/publications/publications.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AdModule,
    AdCampaignModule,
    AuthModule,
    UsersModule,
    NetworkModule,
    AdModule,
    AdCampaignModule,
    CityModule,
    StateModule,
    ClientModule,
    StoreModule,
    PurchaseModule,
    ItemModule,
    ProductModule,
    FamilyModule,
    SellerModule,
    SupervisorModule,
    AdGroupModule,
    DailyResultsModule,
    PublicationsModule,
    RouterModule.register([
      {
        path: 'marketing',
        children: [
          { path: 'daily-results', module: DailyResultsModule },
          { path: 'publications', module: PublicationsModule },
        ],
      },
    ]),
    RouterModule.register([
      {
        path: 'ad',
        module: AdModule,
        children: [
          { path: 'campaign', module: AdCampaignModule },
          { path: 'group', module: AdGroupModule },
        ],
      },
    ]),
    RouterModule.register([
      {
        path: 'bi',
        children: [
          { path: 'city', module: CityModule },
          { path: 'state', module: StateModule },
          { path: 'client', module: ClientModule },
          { path: 'store', module: StoreModule },
          { path: 'purchase', module: PurchaseModule },
          { path: 'item', module: ItemModule },
          { path: 'product', module: ProductModule },
          { path: 'family', module: FamilyModule },
          { path: 'seller', module: SellerModule },
          { path: 'supervisor', module: SupervisorModule },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuditService],
})
export class AppModule {}
