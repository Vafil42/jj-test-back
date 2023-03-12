import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';

@Module({
  providers: [VacancyService]
})
export class VacancyModule {}
