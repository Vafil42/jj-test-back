import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import * as dotenv from 'dotenv';
import { vacancyProviders } from './vacancy.providers';
dotenv.config();

@Module({
  exports: [VacancyModule, VacancyService],
  controllers: [VacancyController],
  providers: [VacancyService, ...vacancyProviders],
})
export class VacancyModule {}
