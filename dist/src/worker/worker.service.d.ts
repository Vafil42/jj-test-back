import { WorkerEntity } from './worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
export declare class WorkerService {
    private workerRepository;
    constructor(workerRepository: typeof WorkerEntity);
    findAll(): Promise<WorkerEntity[]>;
    create(worker: CreateWorkerDto): Promise<any>;
}
