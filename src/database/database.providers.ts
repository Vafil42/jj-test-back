import { Sequelize } from 'sequelize-typescript';
import { WorkerEntity } from 'src/worker/worker.entity'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 3306,
        username: 'admin',
        password: 'admin',
        database: 'nest',
      });
      sequelize.addModels([WorkerEntity]);
      await sequelize.sync();
      return sequelize;
    }
  },
];
