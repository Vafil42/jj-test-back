import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Текущий пароль',
    minLength: 8,
    example: 'password123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Новый пароль (отличается от текущего)',
    minLength: 8,
    example: 'password456',
  })
  newPassword: string;
}
