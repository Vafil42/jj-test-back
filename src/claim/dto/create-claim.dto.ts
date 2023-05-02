import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsString } from "class-validator";

export class CreateClaimDto {
    @ApiProperty({
        description: 'имя пользователя',
        example: 'Лэонид'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'номер телефона пользователя',
        example: '88005553535'
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'жалоба пользователя',
        example: 'Как мне зарегестрироваться!?'
    })
    @IsString()
    body: string;

    @ApiProperty({
        description: 'массив ссылок на фотографии жалобы',
        example: ['типа ссылка на фотку', 'и тут тоже']
    })
    @IsArray()
    image: string[];

    @ApiProperty({
        description: 'email пользователя',
        example: 'example@email.com'
    })
    @IsEmail()
    email: string;
}