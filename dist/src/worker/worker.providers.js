"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerProviders = void 0;
const worker_entity_1 = require("./worker.entity");
exports.workerProviders = [
    {
        provide: 'WORKER_REPOSITORY',
        useValue: worker_entity_1.WorkerEntity,
    },
];
//# sourceMappingURL=worker.providers.js.map