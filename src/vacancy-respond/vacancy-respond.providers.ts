import { VacancyRespondEntity } from './vacancy-respond.entity';

export const vacancyRespondProviders = [
  {
    provide: 'VACANCY_RESPOND_REPOSITORY',
    useValue: VacancyRespondEntity,
  },
];
