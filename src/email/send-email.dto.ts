import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @ApiProperty({
    description: 'передаём маил',
  })
  email: string;
}
