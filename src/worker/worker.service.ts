import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist';
import { WorkerEntity } from './worker.entity';
import { CreateWorkerDto } from './create-worker.dto';

@Injectable()
export class WorkerService {
    constructor(
        @InjectModel(WorkerEntity)
        private workerEntity: typeof WorkerEntity
    ) {}

    async findAll(): Promise<WorkerEntity[]> {
        return this.workerEntity.findAll<WorkerEntity>();
    }

    async create(worker: CreateWorkerDto): Promise<WorkerEntity> {
       return this.workerEntity.create(worker);
    }
}