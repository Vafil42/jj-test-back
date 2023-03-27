import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
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
  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Создание пользователя' })
  @Post()
  async create(@Body() dto: CreateArticleDto, @Request() req) {
    return this.articleService.create(dto, req);
  }
  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @Delete(':id')
  async delete(@Param() param) {
    return await this.articleService.delete(param.id);
  }
  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Изменение данных пользователя по id' })
  @Put(':id')
  async update(@Param() param, @Body() dto: UpdateArticleDto) {
    return await this.articleService.update(param.id, dto);
  }
}
