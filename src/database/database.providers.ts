import { Sequelize } from 'sequelize-typescript';
import { ArticleEntity } from 'src/article/article.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { VacancyEntity } from 'src/vacancy/vacancy.entity';
import { SettingsEntity } from 'src/settings/settings.entity';
import { UserEntity } from 'src/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../../constants';
import { databaseConfig } from './database.config';
import { VacancyRespondEntity } from 'src/vacancy-respond/vacancy-respond.entity';
import { ClaimEntity } from 'src/claim/claim.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([
                UserEntity,
                ArticleEntity,
                ReviewEntity,
                SettingsEntity,
                CategoryEntity,
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
