import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The surname of a user',
    maxLength: 25,
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'The name of a user',
    maxLength: 25,
  })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email address of user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    minLength: 8,
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Shows whether the user banned or not',
    enum: [true, false],
  })
  banned: boolean;

  @IsString()
  permission: string[];

  @IsNumber()
  @ApiProperty({
    description: 'The age of a user',
    maximum: 120,
    minimum: 14,
  })
  age: number;

  @IsString()
  @ApiProperty({
    description: 'Date of birth',
  })
  birthday: string;

  @IsString()
  learn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Taxpayer Identification number',
    minLength: 12,
    maxLength: 12,
  })
  inn: string;

  @IsString()
  @ApiProperty({
    description: 'City where user living',
    minLength: 2,
    maxLength: 25,
    // Минимум и максимум для населенных пунктов в России
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Information about user',
  })
  about: string;

  @IsNumber()
  feedback: number;

  @IsString()
  @ApiProperty({
    description: 'Different roles give the user different permissions',
    enum: ['Admin', 'User'],
  })
  role: string;
}
