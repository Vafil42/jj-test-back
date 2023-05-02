import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Запросы Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({ summary: 'Создание категории админом' })
    @ApiHeader({ name: 'Authorization' })
    @UseGuards(JwtAdminAuthGuard)
    @Post()
    async create(@Body() dto: CreateCategoryDto) {
        return await this.categoryService.create(dto);
    }

    @ApiOperation({ summary: 'Удаление категории по id админом' })
    @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
    @UseGuards(JwtAdminAuthGuard)
    @Delete(':id')
    async delete(@Param() param) {
        return await this.categoryService.delete(param.id);
    }

    @ApiOperation({ summary: 'Получение всех категорий' })
    @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
    @Get()
    async findAll() {
        return await this.categoryService.findAll();
    }

    @ApiOperation({ summary: 'Получение категории по id' })
    @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
    @Get(':id')
    async findOneById(@Param() param) {
        return await this.categoryService.findOneById(param.id);
    }
}
