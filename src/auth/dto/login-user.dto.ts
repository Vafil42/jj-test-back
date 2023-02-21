import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    description: 'Email address of user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    minLength: 8,
  })
  password: string;
}
