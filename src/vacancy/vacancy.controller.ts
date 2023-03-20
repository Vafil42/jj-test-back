import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtUserAuthGuard } from 'src/auth/guard/jwt-user-auth.guard';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyService } from './vacancy.service';

@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(private vacancyService: VacancyService) {}

  @ApiOperation({ summary: 'Получение списка вакансий' })
  @Get()
  async findAll() {
    return await this.vacancyService.findAll();
  }

  @ApiOperation({ summary: 'Получение вакансии по ссылке' })
  @Get(':href')
  async findByHref(@Param() param) {
    return await this.vacancyService.findByHref(param.href);
  }

  @ApiOperation({ summary: 'Создание вакансии' })
  @UseGuards(JwtUserAuthGuard)
  @Post()
  async create(@Body() dto: CreateVacancyDto, @Request() req) {
    return await this.vacancyService.create(dto, req);
  }

  @ApiOperation({ summary: 'Обновление вакансии' })
  @UseGuards(JwtUserAuthGuard)
  @Patch(':href')
  async update(@Param() param, @Body() dto: UpdateVacancyDto, @Request() req) {
    return await this.vacancyService.update(param, dto, req);
  }

  @ApiOperation({ summary: 'Удаление вакансии' })
  @UseGuards(JwtUserAuthGuard)
  @Delete(':href')
  async delete(@Param() param, @Request() req) {
    return await this.vacancyService.delete(param, req);
  }

  @ApiOperation({ summary: 'Спрятать/показать вакансию' })
  @UseGuards(JwtUserAuthGuard)
  @Patch(':href')
  async hideOrShow(
    @Param() param,
    @Body() dto: UpdateVacancyDto,
    @Request() req,
  ) {
    return await this.vacancyService.update(param, dto, req);
  }
}
