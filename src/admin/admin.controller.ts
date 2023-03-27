import { Body, Controller, Param, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('Запросы User (Только админы)')
@Controller('admin')
export class AdminController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAdminAuthGuard)
    @ApiOperation({ summary: 'Создание пользователя админом' })
    @ApiHeader({name: 'Authorization', description: 'Bearer token'})
    @Post()
    async create(@Body() dto: CreateUserDto) {
      return this.userService.create(dto);
    }

    @UseGuards(JwtAdminAuthGuard)
    @ApiOperation({ summary: 'Блокировка пользователя по id админом' })
    @ApiHeader({name: 'Authorization', description: 'Bearer token'})
    @Post(':id')
    async ban(@Param() param, @Request() req) {
      return await this.userService.ban(param.id, req.user.role);
    }

    @UseGuards(JwtAdminAuthGuard)
    @ApiOperation({ summary: 'Удаление пользователя по id админом' })
    @ApiHeader({name: 'Authorization', description: 'Bearer token'})
    @Delete(':id')
    async delete(@Param() param, @Request() req) {
      return await this.userService.delete(param.id, req.user.role);
    }
}
