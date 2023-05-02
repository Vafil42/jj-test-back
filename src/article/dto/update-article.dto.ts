import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateArticleDto {
    @IsString()
    @ApiProperty({
        description: 'We prescribe the title of the article',
        example: 'Как работать вечно?',
    })
    title: string;
    @IsString()
    @ApiProperty({
        description: 'Writing the body of the article',
        example: 'Работаем вечно на своего хозяина',
    })
    body: string;
    @IsString()
    @ApiProperty({
        description: 'Что-то сюда пишем',
        example: 'Какая-то картинка',
    })
    avatar: string;
    @IsBoolean()
    @ApiProperty({
        description: 'visibilite ? True : False',
        example: 'по дефолту видно статью',
    })
    visibilite: boolean;
}
