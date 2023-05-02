import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { JwtUserAuthGuard } from 'src/auth/guard/jwt-user-auth.guard';
import { VacancyRespondService } from './vacancy-respond.service';

@ApiTags('Отклик на вакансии')
@Controller('vacancy/respond')
export class VacancyRespondController {
  constructor(private vacancyRespondService: VacancyRespondService) {}

  @ApiOperation({ summary: 'Получение всех откликов' })
  @UseGuards(JwtAdminAuthGuard)
  @Get('all')
  async findAll() {
    console.log(1);
    return await this.vacancyRespondService.findAll();
  }

  @ApiOperation({ summary: 'Поиск отликов по ссылке на вакансию' })
  @UseGuards(JwtUserAuthGuard)
  @Get('with-href/:href')
  async findAllWithHref(@Param() param) {
    return await this.vacancyRespondService.findAllWithHref(param.href);
  }

  @ApiOperation({ summary: 'Поиск отликов по id пользователя' })
  @UseGuards(JwtUserAuthGuard)
  @Get('with-id/:id')
  async findAllWithId(@Param() param) {
    return await this.vacancyRespondService.findAllWithId(param.id);
  }

  @ApiOperation({
    summary: 'Поиск отлика по ссылке на вакансию и id пользователя',
  })
  @UseGuards(JwtUserAuthGuard)
  @Get(':href/:id')
  async findOne(@Param() param) {
    return await this.vacancyRespondService.findOne(param.href, param.id);
  }

  @ApiOperation({ summary: 'Создание отклика' })
  @UseGuards(JwtUserAuthGuard)
  @Post(':href')
  async create(@Param() param, @Request() req) {
    return await this.vacancyRespondService.create(param.href, req);
  }

  @ApiOperation({ summary: 'Удаление отклика' })
  @UseGuards(JwtUserAuthGuard)
  @Delete(':href')
  async delete(@Param() param, @Request() req) {
    return await this.vacancyRespondService.delete(param.href, req);
  }
}
