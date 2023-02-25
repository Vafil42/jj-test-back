import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    description: 'User`s email address',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User account password',
    minLength: 8,
  })
  password: string;
}
