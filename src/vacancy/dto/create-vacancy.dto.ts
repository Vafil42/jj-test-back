import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsString()
  @ApiProperty({
    description: 'Название вакансии',
    example: 'Работа по дому',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Категория вакансии',
    enum: ['homeTask'],
    example: 'homeTask',
  })
  category: string;

  @IsString()
  @ApiProperty({
    description: '',
  })
  timestamp: string;

  @IsNumber()
  @ApiProperty({
    description: 'Код УФНС региона',
    example: 6700,
  })
  region: number;

  @IsString()
  @ApiProperty({
    description: '',
  })
  body: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Требование опыта',
    example: false,
  })
  requiredExp: boolean;
}
