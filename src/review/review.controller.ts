import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Get,
  Patch,
  Put,
  Param,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { JwtUserAuthGuard } from 'src/auth/guard/jwt-user-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@ApiTags('Запросы Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiHeader({ name: 'Authorization' })
  @UseGuards(JwtUserAuthGuard)
  @Post()
  async create(@Body() dto: CreateReviewDto, @Request() req) {
    return await this.reviewService.create(dto, req);
  }

  @ApiOperation({ summary: 'Удаление отзыва по id отзыва' })
  @ApiHeader({ name: 'Authorization' })
  @UseGuards(JwtUserAuthGuard)
  @Delete(':id')
  async delete(@Param() param, @Request() req) {
    return await this.reviewService.delete(param.id, req);
  }

  @ApiOperation({
    summary: 'Получение отзывов на пользователя по id пользователя',
  })
  @Get(':id')
  async findAllByUserId(@Param() param) {
    return await this.reviewService.findAllByUserId(param.id);
  }

  @ApiOperation({ summary: 'Изменение отзыва по id отзыва' })
  @ApiHeader({ name: 'Authorization' })
  @UseGuards(JwtUserAuthGuard)
  @Patch(':id')
  async update(@Param() param, @Body() dto: UpdateReviewDto, @Request() req) {
    return await this.reviewService.update(param.id, dto, req);
  }

  @ApiOperation({ summary: 'Скрытие отзыва по id отзыва' })
  @ApiHeader({ name: 'Authorization' })
  @UseGuards(JwtAdminAuthGuard)
  @Put(':id')
  async hide(@Param() param, @Request() req) {
    return await this.reviewService.hide(param.id, req);
  }
}
