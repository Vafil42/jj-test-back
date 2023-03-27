import { Body, Controller, Param, UseGuards, Request } from '@nestjs/common';
import { Get, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { JwtUserAuthGuard } from 'src/auth/guard/jwt-user-auth.guard';

@ApiTags('Запросы User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAdminAuthGuard)
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiHeader({name: 'Authorization', description: 'Bearer token'})
  @Get(':id')
  async findById(@Param() param) {
    return await this.userService.findById(param.id);
  }

  @UseGuards(JwtUserAuthGuard)
  @ApiOperation({ summary: 'Изменение данных пользователя по id' })
  @ApiHeader({name: 'Authorization', description: 'Bearer token'})
  @Put(':id')
  async update(@Param() param, @Body() dto: UpdateUserDto, @Request() req) {
    return await this.userService.update(param.id, dto, req.user);
  }
}
