import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';

@Controller('worker')
export class WorkerController {
    constructor( private workerService: WorkerService) {}

    @Get()
    async findAll() {
        return this.workerService.findAll();
    }

    @Post()
    async create(@Body() worker: CreateWorkerDto) {
        return this.workerService.create(worker);
    }

//    @Delete()
//    async delete() {
//        return this.workerService.delete();
//   }

//    @Put()
//    async update() {
//        return this.workerService.update();
//    }

}
