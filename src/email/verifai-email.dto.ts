import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifaiEmailDto {
  @IsString()
  @ApiProperty({
    description: 'передаём маил',
  })
  token: string;
}
