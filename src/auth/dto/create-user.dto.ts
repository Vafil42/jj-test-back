import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User`s last name',
    maxLength: 25,
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'User`s first name',
    maxLength: 25,
  })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User`s email address',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User account password',
    minLength: 8,
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: 'User blocked if value is "true"',
    enum: [true, false],
  })
  banned: boolean;

  @IsString()
  permission: string[];

  @IsNumber()
  @ApiProperty({
    description: 'User`s age',
    maximum: 120,
    minimum: 14,
  })
  age: number;

  @IsString()
  @ApiProperty({
    description: 'User`s date of birth',
  })
  birthday: string;

  @IsString()
  learn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User`s Taxpayer Identification number',
    minLength: 12,
    maxLength: 12,
  })
  inn: string;

  @IsString()
  @ApiProperty({
    description: 'User`s city or town',
    minLength: 2,
    maxLength: 25,
    // Минимум и максимум для населенных пунктов в России
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Resume',
  })
  about: string;

  @IsNumber()
  feedback: number;

  @IsString()
  @ApiProperty({
    description: 'User`s role',
    enum: ['Admin', 'User'],
  })
  role: string;
}
