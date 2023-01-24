import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DailyResultsService } from './daily-results.service';
import { CreateDailyResultDto } from './dto/create-daily-result.dto';
import { UpdateDailyResultDto } from './dto/update-daily-result.dto';

@Controller('')
export class DailyResultsController {
  constructor(private readonly dailyResultsService: DailyResultsService) {}

  @Post()
  create(@Body() createDailyResultDto: CreateDailyResultDto) {
    return this.dailyResultsService.create(createDailyResultDto);
  }

  @Get()
  findAll() {
    return this.dailyResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyResultsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyResultDto: UpdateDailyResultDto,
  ) {
    return this.dailyResultsService.update(+id, updateDailyResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyResultsService.remove(+id);
  }
}
