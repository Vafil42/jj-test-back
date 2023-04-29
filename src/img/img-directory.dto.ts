import { IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  namefile: string;

  @IsString()
  directiry: string;
}
