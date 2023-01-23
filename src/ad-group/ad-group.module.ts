import { Module } from '@nestjs/common';
import { AdGroupService } from './ad-group.service';
import { AdGroupController } from './ad-group.controller';

@Module({
  controllers: [AdGroupController],
  providers: [AdGroupService],
})
export class AdGroupModule {}
