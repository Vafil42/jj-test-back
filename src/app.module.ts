import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerModule } from './worker/worker.module';
import { DatabaseModule } from './database/database.module';


@Module({
    imports: [DatabaseModule, WorkerModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
