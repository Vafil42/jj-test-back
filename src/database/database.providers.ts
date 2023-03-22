import { Sequelize } from 'sequelize-typescript';
import { ArticleEntity } from 'src/article/article.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { SettingsEntity } from 'src/settings/settings.entity';
import { UserEntity } from 'src/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../../constants';
import { databaseConfig } from './database.config';

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
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
