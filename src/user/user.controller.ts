import { Body, Controller, Param, UseGuards, Request } from '@nestjs/common';
import { Get, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { JwtUserAuthGuard } from 'src/auth/guard/jwt-user-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Запросы Admin')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получение списка неодобренных пользователей' })
  @Get('/not-moderated')
  async findNotModerated() {
    return await this.userService.findNotModerated();
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  async findById(@Param() param) {
    return await this.userService.findById(param.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Создание пользователя' })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Блокировка пользователя по id' })
  @Post(':id')
  async ban(@Param() param, @Request() req) {
    return await this.userService.ban(param.id, req.user.role);
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @Delete(':id')
  async delete(@Param() param, @Request() req) {
    return await this.userService.delete(param.id, req.user.role);
  }

  @UseGuards(JwtUserAuthGuard)
  @ApiOperation({ summary: 'Смена пароля' })
  @Put('/change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
    return await this.userService.changePassword(dto, req);
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Изменение данных пользователя по id' })
  @Put(':id')
  async update(@Param() param, @Body() dto: UpdateUserDto, @Request() req) {
    return await this.userService.update(param.id, dto, req.user.role);
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Одобрение юр. лиц' })
  @Put('/moderate/:id')
  async moderate(@Param() param) {
    return await this.userService.moderate(param.id);
  }
}
