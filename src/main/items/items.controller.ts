import { Get, Post, Controller, Body } from '@nestjs/common';

import { ItemsService } from './items.service';

@Controller('main')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get()
    async findAll(): Promise<string[]> {
        return this.itemsService.findAll();
    }
    
    @Post()
    async create(@Body() item: string) {
        return this.itemsService.create(item);
    }

}
