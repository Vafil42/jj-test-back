import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Запросы Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({summary: 'Создание категории'})
    @Post()
    async create(@Body() dto: CreateCategoryDto) {
        return await this.categoryService.create(dto);
    }

    @ApiOperation({summary: 'Удаление категории по id'})
    @Delete(':id')
    async delete(@Param() param) {
        return await this.categoryService.delete(param.id);
    }

    @ApiOperation({summary: 'Получение всех категорий'})
    @Get()
    async findAll() {
        return await this.categoryService.findAll();
    }

    @ApiOperation({summary: 'Получение категории по id'})
    @Get(':id')
    async findOneById(@Param() param) {
        return await this.categoryService.findOneById(param.id);
    }
}
