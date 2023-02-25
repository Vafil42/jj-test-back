import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger';

@ApiTags('Какие-то еще пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получение данных об указанном пользователе' })
  @Get(':id')
  async findById(@Param() param) {
    return await this.userService.findById(param.id);
  }

  @ApiOperation({ summary: '' })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    this.userService.create(dto);
    return await this.userService.create(dto);
  }

  @Post(':id')
  async ban(@Param() param) {
    return await this.userService.ban(param.id);
  }

  @Delete(':id')
  async delete(@Param() param) {
    return await this.userService.delete(param.id);
  }

  @Put(':id')
  async update(@Param() param, @Body() dto: UpdateUserDto) {
    return await this.userService.update(param.id, dto);
  }
}
