import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { workerProviders } from './worker.providers';


@Module({
    imports: [],
    controllers: [WorkerController],
    providers: [WorkerService, ...workerProviders],
    // exports: [WorkerService]
})

export class WorkerModule {}
