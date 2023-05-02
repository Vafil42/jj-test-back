import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { IsArray } from 'sequelize-typescript';

export class CreateVacancyDto {
    @IsString()
    @ApiProperty({
        description: 'Название вакансии',
        example: 'Работа по дому',
    })
    title: string;

    @IsString()
    @ApiProperty({
        description: 'Имя и адрес изображения',
        example: 'src/img/avatar.png',
    })
    avatar: string;

    @IsString()
    @ApiProperty({
        description: 'Категория вакансии',
        example: 'homeTask',
    })
    category: string;

    @ApiProperty({
        description: 'Временные рамки вакансии',
        example: ['01.04.2023', '08.04.2023'],
    })
    timestamp: string[];

    @IsNumber()
    @ApiProperty({
        description: 'Код УФНС региона',
        example: 6700,
    })
    region: number;

    @IsString()
    @ApiProperty({
        description: 'Описание вакансии',
    })
    body: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Требование опыта',
        example: false,
    })
    requiredExp: boolean;
}
