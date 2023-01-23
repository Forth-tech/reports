import { Injectable } from '@nestjs/common';
import { CreateDailyResultDto } from './dto/create-daily-result.dto';
import { UpdateDailyResultDto } from './dto/update-daily-result.dto';

@Injectable()
export class DailyResultsService {
  create(createDailyResultDto: CreateDailyResultDto) {
    return 'This action adds a new dailyResult';
  }

  findAll() {
    return `This action returns all dailyResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyResult`;
  }

  update(id: number, updateDailyResultDto: UpdateDailyResultDto) {
    return `This action updates a #${id} dailyResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyResult`;
  }
}
