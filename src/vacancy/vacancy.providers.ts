import { VacancyEntity } from './vacancy.entity';

export const vacancyProviders = [
    {
        provide: 'VACANCY_REPOSITORY',
        useValue: VacancyEntity,
    },
];
