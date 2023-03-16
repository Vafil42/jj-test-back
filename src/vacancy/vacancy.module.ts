import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [VacancyController],
  providers: [VacancyService, ...vacancyProviders],
})
export class VacancyModule {}
