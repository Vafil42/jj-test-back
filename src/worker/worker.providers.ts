import { WorkerEntity } from './worker.entity';

export const workerProviders = [
    {
        provide: 'WORKER_REPOSITORY',
        useValue: WorkerEntity,
    },
]

