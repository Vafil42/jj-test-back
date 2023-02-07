import { Injectable, Inject } from '@nestjs/common';
import { WorkerEntity } from './worker.entity';
import { CreateWorkerDto } from './create-worker.dto';

@Injectable()
export class WorkerService {
    constructor(
        @Inject('WORKER_REPOSITORY')
        private workerRepository: typeof WorkerEntity
    ) {}

    async findAll(): Promise<WorkerEntity[]> {
        return this.workerRepository.findAll();
    }

    async create(worker: CreateWorkerDto) {
       this.workerRepository.create<WorkerEntity>(worker);
       this.workerRepository.sync()
    }
}