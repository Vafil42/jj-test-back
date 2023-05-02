import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { JwtAdminAuthGuard } from 'src/auth/guard/jwt-admin-auth.guard';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@ApiTags('Запросы Claim')
@Controller('claim')
export class ClaimController {
    constructor(private claimService: ClaimService) {}

    @ApiOperation({ summary: 'Создание жалобы' })
    @Post()
    async create(@Body() dto: CreateClaimDto) {
        return await this.claimService.create(dto);
    }

    @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
    @ApiOperation({
        summary: 'Получения списка неотмодерированных жалоб админом',
    })
    @UseGuards(JwtAdminAuthGuard)
    @Get()
    async findNotModerated() {
        return await this.claimService.findNotModerated();
    }
}
