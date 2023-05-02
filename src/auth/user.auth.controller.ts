import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtUserAuthGuard } from './guard/jwt-user-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user.auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Запросы User (Регистрация и аутентификация)')
@Controller('auth')
export class UserAuthController {
    constructor(private userAuthService: UserAuthService) {}

    @ApiOperation({ summary: 'Аутентификация пользователя' })
    @ApiBody({ type: [LoginUserDto] })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.userAuthService.login(req.user);
    }

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiHeader({ name: 'Authorization' })
    @UseGuards(JwtUserAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.userAuthService.login(req.user);
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @Post('create')
    async create(@Body() dto: CreateUserDto) {
        return this.userAuthService.createUser(dto);
    }
}
