import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Пользователи')
@Controller('auth')
export class UserAuthController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @ApiOperation({ summary: 'Аторизация пользователя' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.login(req.user);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
