import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerEntity } from './worker.entity';

@Module({
    imports: [SequelizeModule.forFeature([WorkerEntity])],
    controllers: [WorkerController],
    providers: [WorkerService,],
})
export class WorkerModule {}
