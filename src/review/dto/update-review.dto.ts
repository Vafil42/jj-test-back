import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateReviewDto {

    @ApiProperty({
        description: 'оценка пользователя',
        example: 5,
    })
    @IsNumber()
    review: number;

    @ApiProperty({
        description: 'отзыв пользователя',
        example: 'Всё классно!'
    })
    @IsString()
    body: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}