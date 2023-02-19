import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param() param) {
    return await this.userService.findById(param.id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
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

  @Put()
  async login(@Body() dto: LoginUserDto) {
    return await this.userService.login(dto);
  }
}

@Controller('api')
export class AppController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }
}
