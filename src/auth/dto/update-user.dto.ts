import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Updated user`s last name',
    maxLength: 25,
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s first name',
    maxLength: 25,
  })
  firstname: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s email address',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user account password',
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
  @ApiProperty({
    description: 'Appended permission for a user',
  })
  permission: string;

  @IsNumber()
  @ApiProperty({
    description: 'Updated user`s age',
    maximum: 120,
    minimum: 14,
  })
  age: number;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s date of birth',
  })
  birthday: string;

  @IsString()
  learn: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s Taxpayer Identification number',
    minLength: 12,
    maxLength: 12,
  })
  inn: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s city or town',
    minLength: 2,
    maxLength: 25,
    // Минимум и максимум для населенных пунктов в России
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s resume',
  })
  about: string;

  @IsNumber()
  feedback: number;

  @IsString()
  @ApiProperty({
    description: 'Updated user`s role',
    enum: ['Admin', 'User'],
  })
  role: string;
}
