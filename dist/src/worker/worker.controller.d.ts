import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
export declare class WorkerController {
    private workerService;
    constructor(workerService: WorkerService);
    findAll(): Promise<import("./worker.entity").WorkerEntity[]>;
    create(worker: CreateWorkerDto): Promise<any>;
}
