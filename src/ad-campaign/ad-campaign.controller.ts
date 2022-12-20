import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdCampaignService } from './ad-campaign.service';
import { CreateAdCampaignDto } from './dto/create-ad-campaign.dto';
import { UpdateAdCampaignDto } from './dto/update-ad-campaign.dto';

@Controller('')
export class AdCampaignController {
  constructor(private readonly adCampaignService: AdCampaignService) {}

  @Post()
  create(@Body() createAdCampaignDto: CreateAdCampaignDto) {
    return this.adCampaignService.create(createAdCampaignDto);
  }

  @Get()
  findAll() {
    return this.adCampaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adCampaignService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdCampaignDto: UpdateAdCampaignDto) {
    return this.adCampaignService.update(+id, updateAdCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adCampaignService.remove(+id);
  }
}
