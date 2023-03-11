import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Запросы Article')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  async findOne(@Param() param) {
    return await this.articleService.findOne(param.href);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @Post()
  async create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @Delete(':id')
  async delete(@Param() param) {
    return await this.articleService.delete(param.id);
  }

  @ApiOperation({ summary: 'Изменение данных пользователя по id' })
  @Put(':id')
  async update(@Param() param, @Body() dto: UpdateArticleDto) {
    return await this.articleService.update(param.id, dto);
  }
}
