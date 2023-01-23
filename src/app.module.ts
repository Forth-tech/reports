import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/services/prisma.service';
import { UsersModule } from './users/users.module';
import { NetworkModule } from './network/network.module';
import { AdModule } from './ad/ad.module';
import { AdCampaignModule } from './ad-campaign/ad-campaign.module';
import { RouterModule } from '@nestjs/core';
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
import { ScheduleModule } from '@nestjs/schedule';
import { AdGroupModule } from './ad-group/ad-group.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AdModule,
    AdCampaignModule,
    AdGroupModule,
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
    AdGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuditService],
})
export class AppModule {}
