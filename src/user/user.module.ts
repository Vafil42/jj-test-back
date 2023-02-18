import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.JWTKEY })],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
