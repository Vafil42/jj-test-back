import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.login(req.user);
  }

  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
