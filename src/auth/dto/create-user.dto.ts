import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsJSON,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User`s last name',
    maxLength: 25,
    example: 'Колышкин',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'User`s first name',
    maxLength: 25,
    example: 'Леонид',
  })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User`s email address',
    example: 'email@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User account password',
    minLength: 8,
    example: 'password123',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Тип пользователя',
    example: 'physical',
  })
  implication: string;

  @IsString()
  @ApiProperty({
    description: 'User`s date of birth',
    example: '24.10.2006',
  })
  birthday: string;

  @IsString()
  @ApiProperty({
    description: 'user`s learn',
    example: 'МБОУ СШ №40',
  })
  learn: string;

  @IsNotEmpty()
  @IsString()
  @Length(12, 12)
  @ApiProperty({
    description: 'User`s Taxpayer Identification number',
    minLength: 12,
    maxLength: 12,
    example: '012345678900',
  })
  inn: string;

  @IsJSON()
  @ApiProperty({
    description: 'Регион пользователя',
    example: {
      name: 'Смоленская',
      type: 'обл',
      name_with_type: 'Смоленская обл',
      federal_district: 'Центральный',
      kladr_id: 6700000000000,
      fias_id: 'e8502180-6d08-431b-83ea-c7038f0df905',
      okato: 66000000000,
      oktmo: 66000000,
      tax_office: 6700,
      postal_code: '',
      iso_code: 'RU-SMO',
      timezone: 'UTC+3',
      geoname_code: 'RU.69',
      geoname_id: 491684,
      geoname_name: 'Smolensk',
    },
  })
  region: JSON;

  @IsString()
  @Length(2, 25)
  @ApiProperty({
    description: 'User`s city or town',
    minLength: 2,
    maxLength: 25,
    example: 'Смоленск',
    // Минимум и максимум для населенных пунктов в России
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Resume',
    example: 'Я люблю сосать большие и толстые члены.',
  })
  about: string;

  @IsString()
  @ApiProperty({
    description: 'User`s role',
    enum: ['ADMIN', 'USER', 'ROOT'],
    example: 'USER',
  })
  role: string;
}
