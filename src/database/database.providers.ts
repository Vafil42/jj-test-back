import { Sequelize } from 'sequelize-typescript';
import { ReviewEntity } from 'src/review/review.entity';
import { UserEntity, UserPermissionEntity } from 'src/user/user.entity';
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
      sequelize.addModels([UserEntity, UserPermissionEntity, ReviewEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
