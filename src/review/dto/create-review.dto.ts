import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'оценка',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  review: number;

  @ApiProperty({
    description: 'отзыв',
    example: 'Всё классно!',
  })
  @IsString()
  body: string;

  @ApiProperty({
    description: 'id пользователя',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
