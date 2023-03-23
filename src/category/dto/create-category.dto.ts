import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Название категории',
        example: 'Програмирование',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Изображение категории',
        example: 'Я хз если честно надо у матвея спросить наверное чтото типа ссылки 8===D',
    })
    @IsString()
    icon: string;
}