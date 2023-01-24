import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/services/prisma.service';
import { DailyModule } from './daily/daily.module';
import { PublicationModule } from './publication/publication.module';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './marketing/network/network.module';
import { AdModule } from './marketing/ad/ad.module';
import { AdCampaignModule } from './marketing/ad-campaign/ad-campaign.module';
import { RouterModule } from '@nestjs/core';
<<<<<<< HEAD
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
=======
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { ClientModule } from './client/client.module';
import { StoreModule } from './store/store.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';
import { FamilyModule } from './family/family.module';
import { SellerModule } from './seller/seller.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { AuditService } from './common/services/audit.service';
>>>>>>> 74410369a109b3cf092846165d58cbec9e4bcd27

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
    StateModule,
    ClientModule,
    StoreModule,
    PurchaseModule,
    ItemModule,
    ProductModule,
    FamilyModule,
    SellerModule,
    SupervisorModule,
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
