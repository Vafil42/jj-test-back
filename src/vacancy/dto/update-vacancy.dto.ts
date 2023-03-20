import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateVacancyDto {
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

  @IsNumber()
  @ApiProperty({
    description: 'Рейтинг вакансии. Формируется из оценок соискателей.',
  })
  priority: number;

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
