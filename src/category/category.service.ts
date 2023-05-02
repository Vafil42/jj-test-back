import { Inject, Injectable } from '@nestjs/common';
import trans from 'src/vendor/Trans';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository: typeof CategoryEntity,
    ) {}

    async create(dto: CreateCategoryDto) {
        const href = trans(dto.title);
        const category = { title: dto.title, icon: dto.icon, href };

        return await this.categoryRepository.create(category);
    }

    async delete(id: number) {
        const category = await this.categoryRepository.findByPk(id);

        return await category.destroy;
    }

    async findAll() {
        return await this.categoryRepository.findAll();
    }

    async findOneById(id: number) {
        return await this.categoryRepository.findByPk(id);
    }
}
