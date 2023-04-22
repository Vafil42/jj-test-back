import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { VacancyModule } from 'src/vacancy/vacancy.module';
import { VacancyService } from 'src/vacancy/vacancy.service';
import { VacancyRespondController } from './vacancy-respond.controller';
import { vacancyRespondProviders } from './vacancy-respond.providers';
import { VacancyRespondService } from './vacancy-respond.service';

dotenv.config();

@Module({
  imports: [VacancyModule],
  controllers: [VacancyRespondController],
  providers: [VacancyRespondService, ...vacancyRespondProviders],
})
export class VacancyRespondModule {}
