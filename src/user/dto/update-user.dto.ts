import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  banned: boolean;

  @IsString()
  permission: string;

  @IsNumber()
  age: number;

  @IsString()
  birsday: string;

  @IsString()
  learn: string;

  @IsString()
  inn: string;

  @IsString()
  city: string;

  @IsString()
  about: string;

  @IsNumber()
  feedback: number;

  @IsString()
  role: string;
}
